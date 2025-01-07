from django.db import models

class Role(models.Model):
    idrole = models.AutoField(db_column='idRole', primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=50)
    state = models.CharField(max_length=8, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Role'
