import os

from core.models import User
from django.core.management.base import BaseCommand


class Command(BaseCommand):

    def handle(self, *args, **options):
        self.stdout.write('creating superuser....')
        if User.objects.count() == 0:
            email = os.getenv('ADMIN_EMAIL')
            password = os.getenv('ADMIN_PASSWORD')
            user = User.objects.create_superuser(
                email=email,
                password=password
            )
            user.save()
            self.stdout.write('superuser created')
        else:
            self.stdout.write('A superuser already exist')
