from django.db import models


class Phonestakeholder(models.Model):
    idphone = models.AutoField(db_column='idPhone', primary_key=True)  # Field name made lowercase.
    number = models.CharField(max_length=255)
    stakeholderid = models.ForeignKey('Stakeholder', models.DO_NOTHING, db_column='stakeHolderId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PhoneStakeHolder'
