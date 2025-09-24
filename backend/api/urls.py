from django.urls import path
from .views import RegisterView, posts_view, delete_post_view, user_search_view, like_post, unlike_post, get_commments, create_comment
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('posts/', posts_view, name='posts'),
    path('posts/<int:post_id>/', delete_post_view, name='delete_post'),
    path('posts/<int:post_id>/like/', like_post, name='like_post'),
    path('posts/<int:post_id>/unlike/', unlike_post, name='unlike_post'),
    path('posts/<int:post_id>/comments/', get_commments, name='get_comments'),
    path('posts/<int:post_id>/comment/', create_comment, name='create_comment'),
    path('users/search', user_search_view, name='user_search'),  
]