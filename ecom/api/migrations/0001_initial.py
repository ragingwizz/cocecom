from django.db import migrations
from api.user.models import CustomUser

class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        user = CustomUser(name='nitin', 
                            email='ragingwizz@gmail.com', 
                            is_staff=True, 
                            is_active=True, 
                            is_superuser=True,
                            phone="8898345968", gender="Male")
        user.set_password("12345")
        user.save()

    dependecies = [

    ]

    operations = [
        migrations.RunPython(seed_data),
    ]