#!/usr/bin/env python3
"""Gera um currículo PDF de uma página — edite os dados abaixo."""

from pathlib import Path
from fpdf import FPDF

OUT = Path("/home/user/assets/curriculo-gustavo-reis.pdf")

NAME = "Gustavo Reis"
ROLE = "Analista de Suporte  |  Infraestrutura  |  Redes  |  Seguranca"
LOCATION = "Rio de Janeiro, Brasil"
EMAIL = "seu.email@exemplo.com"
PHONE = "+55 (21) 00000-0000"
GITHUB = "github.com/SEU-USUARIO"
LINKEDIN = "linkedin.com/in/SEU-USUARIO"

SUMMARY = (
    "Profissional de TI focado em suporte, infraestrutura, redes e seguranca. "
    "Atuo na resolucao de incidentes, administracao de ambientes Windows/Linux, "
    "Active Directory e automacao com PowerShell e Python — sempre com documentacao "
    "e melhoria continua dos processos."
)

EXPERIENCE = [
    {
        "title": "Analista de Suporte — Infraestrutura",
        "meta": "Ambiente corporativo  ·  2024 — Atual",
        "bullets": [
            "Atendimento N1/N2, diagnostico e resolucao de incidentes de infraestrutura.",
            "Administracao de Active Directory, DNS, DHCP e politicas de acesso.",
            "Apoio em redes TCP/IP, VLANs, firewall e hardening basico de estacoes.",
            "Automacao de tarefas repetitivas com PowerShell e Python.",
        ],
    },
    {
        "title": "Tecnico de Informatica / Service Desk",
        "meta": "Ambiente corporativo  ·  2022 — 2024",
        "bullets": [
            "Suporte a usuarios, hardware, imaging e manutencao de estacoes Windows.",
            "Registro e acompanhamento de chamados com foco em SLA e documentacao.",
            "Apoio a equipe de redes e servidores em rotinas e incidentes.",
        ],
    },
]

EDUCATION = [
    "Ciencia da Computacao — em andamento",
    "Pos-graduacao em Seguranca de Redes",
    "Analise e Desenvolvimento de Sistemas",
    "Tecnico em Informatica",
]

SKILLS = [
    "Windows / Windows Server",
    "Linux",
    "Redes TCP/IP",
    "Active Directory",
    "DNS / DHCP",
    "VLAN",
    "Firewall",
    "Seguranca de Redes",
    "Python",
    "PowerShell",
    "Hardware",
    "Service Desk",
]


class CV(FPDF):
    def header(self):
        self.set_fill_color(7, 11, 18)
        self.rect(0, 0, 210, 44, "F")
        self.set_text_color(238, 244, 251)
        self.set_font("DejaVu", "B", 22)
        self.set_xy(16, 12)
        self.cell(178, 10, NAME)
        self.set_xy(16, 23)
        self.set_font("DejaVu", "", 10)
        self.set_text_color(45, 212, 191)
        self.cell(178, 6, ROLE)
        self.set_xy(16, 31)
        self.set_font("DejaVu", "", 8)
        self.set_text_color(180, 196, 214)
        contact = f"{LOCATION}   ·   {EMAIL}   ·   {PHONE}"
        self.cell(178, 5, contact)
        self.set_xy(16, 36)
        self.cell(178, 5, f"{GITHUB}   ·   {LINKEDIN}")

    def footer(self):
        self.set_y(-12)
        self.set_font("DejaVu", "", 7)
        self.set_text_color(140, 156, 176)
        self.cell(0, 6, "Curriculo gerado para o portfolio — atualize empresas, datas e contatos.", align="C")


def section(pdf, title, y):
    pdf.set_xy(16, y)
    pdf.set_font("DejaVu", "B", 11)
    pdf.set_text_color(7, 11, 18)
    pdf.cell(178, 7, title.upper())
    y = pdf.get_y() + 7
    pdf.set_draw_color(45, 212, 191)
    pdf.set_line_width(0.6)
    pdf.line(16, y, 194, y)
    return y + 4


def build():
    pdf = CV(format="A4")
    pdf.set_auto_page_break(auto=False)
    pdf.add_font("DejaVu", "", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")
    pdf.add_font("DejaVu", "B", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")
    pdf.add_page()

    y = 52
    y = section(pdf, "Resumo", y)
    pdf.set_xy(16, y)
    pdf.set_font("DejaVu", "", 10)
    pdf.set_text_color(40, 48, 58)
    pdf.multi_cell(178, 5.2, SUMMARY)
    y = pdf.get_y() + 6

    y = section(pdf, "Experiencia", y)
    for job in EXPERIENCE:
        pdf.set_xy(16, y)
        pdf.set_font("DejaVu", "B", 10.5)
        pdf.set_text_color(7, 11, 18)
        pdf.cell(178, 6, job["title"])
        y += 6
        pdf.set_xy(16, y)
        pdf.set_font("DejaVu", "", 8.5)
        pdf.set_text_color(20, 130, 120)
        pdf.cell(178, 5, job["meta"])
        y += 6
        pdf.set_font("DejaVu", "", 9.5)
        pdf.set_text_color(40, 48, 58)
        for b in job["bullets"]:
            pdf.set_xy(16, y)
            pdf.multi_cell(178, 5, f"-  {b}")
            y = pdf.get_y() + 0.6
        y += 3

    y = section(pdf, "Formacao", y)
    pdf.set_font("DejaVu", "", 10)
    pdf.set_text_color(40, 48, 58)
    for item in EDUCATION:
        pdf.set_xy(16, y)
        pdf.cell(178, 5.6, f"-  {item}")
        y += 5.6

    y += 5
    y = section(pdf, "Competencias", y)
    pdf.set_font("DejaVu", "", 9.5)
    pdf.set_text_color(40, 48, 58)
    for i, skill in enumerate(SKILLS):
        col = i % 2
        row = i // 2
        pdf.set_xy(16 + col * 90, y + row * 6)
        pdf.cell(88, 6, f"-  {skill}")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUT))
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    build()
