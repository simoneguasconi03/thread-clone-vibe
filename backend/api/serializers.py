from rest_framework import serializers
from .models import Post
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )

class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    created_at = serializers.DateTimeField(read_only=True)
    likes_count = serializers.SerializerMethodField()
    liked_by_user = serializers.SerializerMethodField()

    parent = serializers.PrimaryKeyRelatedField(read_only=True)
    replies_count = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'author', 'content', 'created_at', 'likes_count', 'liked_by_user', 'parent', 'replies_count', 'replies']
        read_only_fields = ['id', 'author', 'created_at', 'likes_count', 'liked_by_user', 'parent', 'replies_count', 'replies']

    def get_likes_count(self, obj):
        return obj.likes.count()
    
    def get_liked_by_user(self, obj):
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
            return obj.likes.filter(id=request.user.id).exists()
        return False
    
    def get_replies_count(self, obj):
        return Post.objects.filter(parent=obj).count()
    
    def get_replies(self, obj):
        comments = Post.objects.filter(parent=obj).order_by('created_at')
        serializer = PostSerializer(comments, many=True, context=self.context)
        return serializer.data