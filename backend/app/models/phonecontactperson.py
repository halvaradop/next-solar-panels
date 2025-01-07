from django.db import models


class Phonecontactperson(models.Model):
    idphone = models.AutoField(db_column='idPhone', primary_key=True)  # Field name made lowercase.
    number = models.CharField(max_length=255)
    idcontactperson = models.ForeignKey(Contactperson, models.DO_NOTHING, db_column='idContactPerson')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PhoneContactPerson'
