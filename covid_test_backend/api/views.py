# -*- coding: utf-8 -*-
from __future__ import unicode_literals

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
    # sent_data = id_number
    # salt = bcrypt.gensalt()
    # hashed = bcrypt.hashpw(sent_data.encode('utf-8'), salt)
    # print(salt, hashed)
    # return HttpResponse(f'{salt} ... {hashed}')


def add_results(request):
    # flow: rozdel input na riadky, kazdy riadok na jednotlive kusy dat, s nimi vyrob instanciu TestResult, uloz do DB.

    # POZOR: date format musi byt YYYY-MM-DD
    # first mock's id_number is 19700101
    mock = """2020-01-01;$2b$12$CpUahV7dM5pxgbC1siyojOqIbwbYSB1C83vh1BHplpbB.1HVrSVJq;0
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
