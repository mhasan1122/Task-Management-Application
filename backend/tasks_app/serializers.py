from rest_framework import serializers
from .models import Task
from users.models import User

class TaskSerializer(serializers.ModelSerializer):
    owner_email = serializers.ReadOnlyField(source='owner.email')

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'completed', 'created_at', 'updated_at', 'owner', 'owner_email']
        read_only_fields = ['owner']