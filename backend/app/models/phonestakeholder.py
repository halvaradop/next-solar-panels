from django.db import models


class PhoneStakeHolder(models.Model):
    id_phone = models.AutoField(db_column='idPhone', primary_key=True)  # Field name made lowercase.
    number = models.CharField(max_length=255)
    stake_holder_id = models.ForeignKey('StakeHolder', models.DO_NOTHING, db_column='stakeHolderId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PhoneStakeHolder'
