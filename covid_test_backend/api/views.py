# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import uuid

import bcrypt as bcrypt
from django.http import JsonResponse, HttpResponse

from .models import TestResult


def check(request):
    assert request.method == 'POST'

    executed_at = request.GET.get('executed_at')
    id_number = request.GET.get('id_number')

    # TODO validate these
    assert executed_at
    assert id_number

    test_result = TestResult.check_test_result(executed_at, id_number)

    response = JsonResponse({
        'test_result': 'negative' if test_result else 'notfound'
    })

    response['Access-Control-Allow-Origin'] = '*'

    return response


def __generate_hash():
    pass
    # sent_data = id_number + '1f26529f-8d90-40b2-82fc-a81536c905e3'
    # hashed = bcrypt.hashpw(sent_data.encode('utf-8'), bcrypt.gensalt())
    # print(hashed)


def add_results(request):
    # flow: rozdel input na riadky, kazdy riadok na jednotlive kusy dat, s nimi vyrob instanciu TestResult, uloz do DB.

    # POZOR: date format musi byt YYYY-MM-DD
    mock = """2020-01-01;1f26529f-8d90-40b2-82fc-a81536c905e3;$2b$12$NrJSTrRGkfhNo5LSiRZtaud5arsaOnEWQoHXYg48PLKl23a8tBsS6;0
2020-01-01;1f26529f-8d90-40b2-82fc-a81536c905e3;$1$wwwwwww=$;0
2020-01-01;1f26529f-8d90-40b2-82fc-a81536c905e3;$1$eeeeee=$;0
2020-01-01;1f26529f-8d90-40b2-82fc-a81536c905e3;$rrrrr=$;0
2020-01-01;1f26529f-8d90-40b2-82fc-a81536c905e3;$1$nJuP$LkmznbaSd!3;1"""

    # lines = request.POST.get('test_results').split('\n')
    lines = mock.split('\n')

    for line in lines:
        fields = line.split(';')
        new_test_result = TestResult(
            executed_at=fields[0],
            salt=fields[1],
            hash_patient=fields[2],
            result=fields[3]
        )
        new_test_result.save()

    return HttpResponse(f'pridali sme {len(lines)} výsledkov testov')
