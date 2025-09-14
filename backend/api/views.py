from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import GenericAPIView
from django.contrib.auth import get_user_model
from django.db.models import Q
from .models import Post, PostLike
from .serializers import PostSerializer, RegisterSerializer


class RegisterView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer  

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': 'User created successfully',
                'user': {
                    'id': user.id,
                    'username': user.username,
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def posts_view(request):
    if request.method == 'GET':
        posts = Post.objects.all().order_by('-created_at')
        serializer = PostSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticatedOrReadOnly])
def delete_post_view(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({'detail': 'Post not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    if post.author != request.user:
        return Response({'detail': 'Not authorized to delete this post.'}, status=status.HTTP_403_FORBIDDEN)
    
    post.delete()
    return Response({'detail': 'Post deleted.'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly]) 
def user_search_view(request):
    query = request.GET.get('q', '').strip()
    if not query:
        return Response({'data': [], 'total': 0})

    User = get_user_model()
    
    users = User.objects.filter(
        Q(username__icontains=query) |
        Q(first_name__icontains=query) |
        Q(last_name__icontains=query)
    ).values('id', 'username', 'first_name', 'last_name')[:20]  # limite di 20 risultati

    return Response({
        'data': list(users),
        'total': len(users)
    })

@api_view(['POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def like_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({'detail': 'Post not found.'}, status=status.HTTP_404_NOT_FOUND)

    if PostLike.objects.filter(user=request.user, post=post).exists():
        return Response({'detail': 'Already liked.'}, status=status.HTTP_200_OK)

    PostLike.objects.create(user=request.user, post=post)
    post.refresh_from_db()
    return Response({'detail': 'Post liked.', 'likes_count': post.likes.count()}, status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
@permission_classes([IsAuthenticatedOrReadOnly])
def unlike_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({'detail': 'Post not found.'}, status=status.HTTP_404_NOT_FOUND)

    like = PostLike.objects.filter(user=request.user, post=post)
    if like.exists():
        like.delete()
        post.refresh_from_db() 
        return Response({'detail': 'Like removed.', 'likes_count': post.likes.count()}, status=status.HTTP_200_OK)

    return Response({'detail': 'Like does not exist.', 'likes_count': post.likes.count()}, status=status.HTTP_200_OK)