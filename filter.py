import nltk
from nltk.translate import bleu
from nltk.translate.bleu_score import SmoothingFunction
smoothie = SmoothingFunction().method4

f=open('Inputs/reference.txt','r',encoding='ISO-8859-1')
ref=[l.upper() for l in f]
f.close()


def calcul_matching(mot):  # mot va etre en uppercase dans cette méthode
    """
    #optimiser
    scores = []
    for r in ref:
        score = bleu([r], mot.upper(), smoothing_function=smoothie)
        scores.append((r, score))
    """
    scores=[(r,bleu([r], mot.upper(), smoothing_function=smoothie)) for r in ref ]
    scores = sorted(scores, key=lambda e: e[1])  # il faut prendre en compte en cas d'égalite
    return (mot, scores[len(scores) - 1])  # le mot , le mot de ref possible avec la similarité entre les 2


def calcul_matching_cons(cons_words):  # a medecine is composed maximally of 3 words
    # cons_words table of 3 words
    # 1 ere essai

    s1 = calcul_matching(cons_words[0])
    s2 = s1
    if len(cons_words) >= 2:
        s2 = calcul_matching(''.join(cons_words[0:2]))
    s3 = s1
    if len(cons_words) == 3:
        s3 = calcul_matching(''.join(cons_words[0:3]))
    res = sorted([s1, s2, s3], key=lambda e: e[1][1])
    return res[2]


def filter_med(words, min_conf=0.4):  # version 1 only one word
    result = []
    for i, w in enumerate(words):
        cons_w = [w]
        if i + 1 <= len(words) - 1:
            cons_w.append(words[i + 1])
        if i + 2 <= len(words) - 1:
            cons_w.append(words[i + 2])

        m, (r, p) = calcul_matching_cons(cons_w)
        # if round(p,1)>=min_conf:
        if (p > min_conf and r not in result):
            #result.append((m, r, p))
            #result.append((m,( r, p)))
            result.append((r,p))

    return result
