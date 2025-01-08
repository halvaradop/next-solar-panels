class ContactPerson(models.Model):
    id_contactperson = models.CharField(db_column='idContactPerson', primary_key=True, max_length=36)  # Field name made lowercase.
    first_name = models.CharField(db_column='firstName', max_length=50)  # Field name made lowercase.
    last_name = models.CharField(db_column='lastName', max_length=50)  # Field name made lowercase.
    fax = models.CharField(max_length=255, blank=True, null=True)
    www = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(unique=True, max_length=100)
    password = models.CharField(max_length=50)
    state = models.CharField(max_length=8, blank=True, null=True)
    id_role = models.ForeignKey('Role', models.DO_NOTHING, db_column='idRole')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ContactPerson'
