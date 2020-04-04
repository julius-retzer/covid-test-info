# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import random

from django.http import JsonResponse, HttpResponse

from .models import TestResult


def check(request):
    assert request.method == 'POST'

    executed_at = request.POST.get('executed_at')
    id_number = request.POST.get('id_number')

    # TODO validate these
    assert executed_at
    assert id_number

    # TODO gather from database

    response = JsonResponse({
        'test_result': random.choice(['notfound', 'negative'])
    })

    response['Access-Control-Allow-Origin'] = '*'

    return response


def add_results(request):
    # flow: rozdel input na riadky, kazdy riadok na jednotlive kusy dat, s nimi vyrob instanciu TestResult, uloz do DB.

    # POZOR: date format musi byt YYYY-MM-DD
    mock = """2020-01-01;$1$qqqqqq=$;0
2020-01-01;$1$wwwwwww=$;0
2020-01-01;$1$eeeeee=$;0
2020-01-01;$rrrrr=$;0
2020-01-01;$1$nJuP$LkmznbaSd!3;1"""

    # lines = request.POST.get('test_results').split('\n')
    lines = mock.split('\n')

    for line in lines:
        fields = line.split(';')
        new_test_result = TestResult(
            executed_at=fields[0],
            hash_patient=fields[1],
            result=fields[2]
        )
        new_test_result.save()

    return HttpResponse(f'pridali sme {len(lines)} výsledkov testov')
