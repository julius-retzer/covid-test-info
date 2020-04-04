# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import bcrypt

from django.db import models


class TestResult(models.Model):
    executed_at = models.DateField('day month and year the test was executed')
    hash_patient = models.CharField(max_length=60)
    result = models.BooleanField()

    @staticmethod
    def check_test_result(executed_at, id_number):
        tests = TestResult.objects.filter(executed_at=executed_at)

        for db_test in tests:
            db_hash = db_test.hash_patient

            try:
                if bcrypt.checkpw(id_number.encode('utf8'), db_hash.encode('utf8')):
                    return True
            except Exception:
                continue

        return False


class ResultRequest(models.Model):
    patient_id = models.CharField(max_length=15)
    executed_at = models.DateField('day month and year the test was executed')
    email = models.EmailField(max_length=100)

    def __str__(self):
        return f'R.č. {self.patient_id} z {self.executed_at}, {self.email}'