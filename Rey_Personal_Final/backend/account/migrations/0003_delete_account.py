

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("account", "0002_remove_account_full_name"),
    ]

    operations = [
        migrations.DeleteModel(
            name="Account",
        ),
    ]
