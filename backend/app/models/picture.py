from django.db import models


class Picture(models.Model):
    idpicture = models.AutoField(db_column='idPicture', primary_key=True)  # Field name made lowercase.
    idstakeholder = models.CharField(db_column='idStakeholder', max_length=255)  # Field name made lowercase.
    designation = models.CharField(max_length=255)
    date = models.DateTimeField(blank=True, null=True)
    updateat = models.DateTimeField(db_column='updateAt', blank=True, null=True)  # Field name made lowercase.
    picturefile = models.CharField(db_column='pictureFile', max_length=255)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Picture'
