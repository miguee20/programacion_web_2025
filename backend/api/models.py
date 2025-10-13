from django.db import models
from django.utils import timezone

class SecretMetadata(models.Model):
    key = models.CharField(max_length=36, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    accessed_at = models.DateTimeField(null=True, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    ttl_hours = models.IntegerField(default=24)  

    def mark_accessed(self, ip):
        self.accessed_at = timezone.now()
        self.ip_address = ip
        self.save()

    def __str__(self):
        return f"SecretMetadata(key={self.key}, created_at={self.created_at}, ttl_hours={self.ttl_hours})"