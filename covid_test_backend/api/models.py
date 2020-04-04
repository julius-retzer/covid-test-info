# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import bcrypt

from django.db import models


class TestResult(models.Model):
    executed_at = models.DateField('day month and year the test was executed')
    hash_patient = models.CharField(max_length=60)
    # todo add pepper
    result = models.BooleanField()

    def check_test_result(self, executed_at, id_number):
        tests = self.objects.filter(executed_at=executed_at)

        for db_test in tests:
            db_pepper = None
            xx_hash = bcrypt
            db_hash = db_test.hash_patient

            if bcrypt.checkpw(password, hashed):
                xx



        return None

