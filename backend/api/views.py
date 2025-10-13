from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.utils import timezone
from .models import SecretMetadata
import json, uuid

DEFAULT_TTL = 86400

@csrf_exempt
def hide_secret(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        secret = data.get('secret')
        ttl_hours = data.get('ttl_hours', 24)  

        if not secret:
            return JsonResponse({'error': 'Secret text is required'}, status=400)

        try:
            ttl_hours = int(ttl_hours)
            if ttl_hours < 1 or ttl_hours > 720:  # Limit between 1 hour and 30 days
                return JsonResponse({'error': 'TTL must be between 1 and 720 hours'}, status=400)
        except (TypeError, ValueError):
            return JsonResponse({'error': 'Invalid TTL value'}, status=400)

        key = str(uuid.uuid4())
        ttl_seconds = ttl_hours * 3600  
        
        # save to Redis with expiration
        settings.REDIS_CLIENT.set(key, secret, ex=ttl_seconds)
        
        SecretMetadata.objects.create(key=key, ttl_hours=ttl_hours)

        return JsonResponse({'key': key})

    return JsonResponse({'error': 'Invalid method'}, status=405)


@csrf_exempt
def reveal_secret(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        key = data.get('key')

        if not key:
            return JsonResponse({'error': 'Key is required'}, status=400)

        secret = settings.REDIS_CLIENT.get(key)
        if not secret:
            return JsonResponse({'error': 'Secret not found or already revealed'}, status=404)

        settings.REDIS_CLIENT.delete(key)
        
        metadata = SecretMetadata.objects.filter(key=key).first()
        if metadata:
            metadata.mark_accessed(request.META.get('REMOTE_ADDR'))

        return JsonResponse({'secret': secret})

    return JsonResponse({'error': 'Invalid method'}, status=405)