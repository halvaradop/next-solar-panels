from django.db import models

class Project(models.Model):
    id_project = models.CharField(db_column='idProject', primary_key=True, max_length=36)  # Field name made lowercase.
    state = models.CharField(max_length=8, blank=True, null=True)
    designation = models.CharField(max_length=255)
    id_contact_person = models.ForeignKey('ContactPerson', models.DO_NOTHING, db_column='idContactPerson')  # Field name made lowercase.
    id_stakeholder = models.ForeignKey('Stakeholder', models.DO_NOTHING, db_column='idStakeholder')  # Field name made lowercase.
    id_address = models.ForeignKey('Address', models.DO_NOTHING, db_column='idAddress')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Project'
