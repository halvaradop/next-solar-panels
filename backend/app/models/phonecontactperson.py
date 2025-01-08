from django.db import models


class PhoneContactPerson(models.Model):
    id_phone = models.AutoField(db_column='idPhone', primary_key=True)  # Field name made lowercase.
    number = models.CharField(max_length=255)
    id_contactperson = models.ForeignKey('ContactPerson', models.DO_NOTHING, db_column='idContactPerson')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PhoneContactPerson'
