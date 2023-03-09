
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Order",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("dog_breed", models.CharField(max_length=255)),
                ("dog_age", models.PositiveSmallIntegerField()),
                (
                    "dog_size",
                    models.CharField(
                        choices=[
                            ("large", "Large"),
                            ("medium", "Medium"),
                            ("small", "Small"),
                        ],
                        max_length=10,
                    ),
                ),
                ("rent_start", models.DateTimeField()),
                ("rent_duration", models.IntegerField()),
                ("location", models.CharField(max_length=255)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="orders",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
