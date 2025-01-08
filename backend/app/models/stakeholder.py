from django.db import models

class StakeHolder(models.Model):
    id_stake_holder = models.CharField(db_column='idStakeHolder', primary_key=True, max_length=36)  # Field name made lowercase.
    name = models.CharField(max_length=100)
    industry = models.CharField(max_length=100)
    email = models.CharField(unique=True, max_length=100)
    password = models.CharField(max_length=50)
    fax = models.CharField(max_length=255, blank=True, null=True)
    www = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=16)
    state = models.CharField(max_length=8, blank=True, null=True)
    id_address = models.ForeignKey(Address, models.DO_NOTHING, db_column='idAddress')  # Field name made lowercase.
    id_contactperson = models.ForeignKey(Contactperson, models.DO_NOTHING, db_column='idContactPerson')  # Field name made lowercase.
    id_picture = models.ForeignKey(Picture, models.DO_NOTHING, db_column='idPicture', blank=True, null=True)  # Field name made lower>

    class Meta:
        managed = False
        db_table = 'StakeHolder'
