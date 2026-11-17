import os
import shutil

def generate_pdf():
    try:
        from reportlab.lib.pagesizes import letter
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib import colors

        pdf_path = os.path.join('public', 'Bhumika_Singh_Resume.pdf')
        alt_pdf_path = os.path.join('public', 'resume.pdf')
        
        doc = SimpleDocTemplate(
            pdf_path,
            pagesize=letter,
            leftMargin=36,
            rightMargin=36,
            topMargin=36,
            bottomMargin=36
        )

        styles = getSampleStyleSheet()

        title_style = ParagraphStyle(
            'TitleStyle',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=22,
            leading=26,
            alignment=1,
            textColor=colors.HexColor('#000000')
        )

        contact_style = ParagraphStyle(
            'ContactStyle',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=10,
            leading=14,
            alignment=1,
            textColor=colors.HexColor('#2563EB')
        )

        heading_left = ParagraphStyle(
            'HeadingLeft',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=10.5,
            leading=13,
            textColor=colors.HexColor('#000000')
        )

        heading_right = ParagraphStyle(
            'HeadingRight',
            parent=styles['Normal'],
            fontName='Helvetica-Oblique',
            fontSize=10,
            leading=13,
            alignment=2,
            textColor=colors.HexColor('#000000')
        )

        body_left = ParagraphStyle(
            'BodyLeft',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=10,
            leading=14,
            textColor=colors.HexColor('#000000')
        )

        body_right = ParagraphStyle(
            'BodyRight',
            parent=styles['Normal'],
            fontName='Helvetica-Oblique',
            fontSize=10,
            leading=14,
            alignment=2,
            textColor=colors.HexColor('#000000')
        )

        sub_body_left = ParagraphStyle(
            'SubBodyLeft',
            parent=styles['Normal'],
            fontName='Helvetica-Oblique',
            fontSize=10,
            leading=14,
            textColor=colors.HexColor('#000000')
        )

        text_style = ParagraphStyle(
            'TextStyle',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9.5,
            leading=13.5,
            textColor=colors.HexColor('#000000')
        )

        bullet_style = ParagraphStyle(
            'BulletStyle',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9.5,
            leading=13.5,
            leftIndent=12,
            firstLineIndent=-12,
            textColor=colors.HexColor('#000000')
        )

        story = []

        # Name Header
        story.append(Paragraph('Bhumika Singh', title_style))
        story.append(Spacer(1, 4))

        # Contact line
        contact_text = '<font color="#2563EB"><u>+91-9161312454</u></font> / <font color="#2563EB"><u>bhumikasingh0407@gmail.com</u></font> / <a href="https://www.linkedin.com/in/bhumika-code404"><font color="#2563EB"><u>linkedin.com/in/bhumika-code404</u></font></a> / <a href="https://github.com/bhumikasingh0455"><font color="#2563EB"><u>github.com/bhumikasingh0455</u></font></a>'
        story.append(Paragraph(contact_text, contact_style))
        story.append(Spacer(1, 10))

        def add_section_header(title, right_text=""):
            if right_text:
                table = Table(
                    [[Paragraph(f'<b>{title}</b>', heading_left), Paragraph(f'<i>{right_text}</i>', heading_right)]],
                    colWidths=[400, 140]
                )
                table.setStyle(TableStyle([
                    ('VALIGN', (0,0), (-1,-1), 'BOTTOM'),
                    ('LEFTPADDING', (0,0), (-1,-1), 0),
                    ('RIGHTPADDING', (0,0), (-1,-1), 0),
                    ('TOPPADDING', (0,0), (-1,-1), 0),
                    ('BOTTOMPADDING', (0,0), (-1,-1), 0),
                ]))
                story.append(table)
            else:
                story.append(Paragraph(f'<b>{title}</b>', heading_left))
            story.append(Spacer(1, 2))
            story.append(HRFlowable(width='100%', thickness=0.8, color=colors.HexColor('#333333'), spaceBefore=1, spaceAfter=6))

        # PROJECTS
        add_section_header('PROJECTS', '2026 – Present')

        projects = [
            '<b>PrepAI</b> – AI-powered mock interview preparation & ATS resume platform with real-time speech interviews and OpenAI feedback. (<font color="#2563EB"><u>https://ai-interview-platform-three-liart.vercel.app</u></font>)',
            '<b>DevConnect</b> – Real-time developer social networking platform featuring developer profile showcases, post feed, and JWT security.',
            '<b>ProShop E-Commerce</b> – Full-stack online shopping platform with cart persistence, product review system, and Stripe payment gateway.',
            '<b>Task Manager Pro</b> – Productivity-focused task management app featuring priority scheduling, real-time status filtering, and inline editing.',
            '<b>Java DS & Core Algorithms</b> – Core engineering repository containing Java implementations of linear & non-linear data structures and OOP design patterns.'
        ]
        for p in projects:
            story.append(Paragraph(f'• &nbsp; {p}', bullet_style))
            story.append(Spacer(1, 4))

        # EXPERIENCE
        story.append(Spacer(1, 4))
        add_section_header('EXPERIENCE')

        exp_table = Table(
            [[Paragraph('<b>Full Stack Developer Intern at Hindalco Industries Ltd.</b>', body_left),
              Paragraph('<i>Jun 2026 – Jul 2026</i>', body_right)]],
            colWidths=[380, 160]
        )
        exp_table.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(exp_table)
        story.append(Spacer(1, 3))
        story.append(Paragraph('Completed a Full Stack Development internship focused on React.js and Node.js, gaining exposure to modern web development practices and collaborative software development.', text_style))

        # EDUCATION
        story.append(Spacer(1, 8))
        add_section_header('EDUCATION')

        edu1 = Table(
            [[Paragraph('<b>GLA University</b>', body_left), Paragraph('<b>Mathura, Uttar Pradesh</b>', body_right)],
             [Paragraph('<i>B.Tech. in Computer Science and Engineering</i>', sub_body_left), Paragraph('<i>July 2024 – July 2028</i>', body_right)]],
            colWidths=[380, 160]
        )
        edu1.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ]))
        story.append(edu1)
        story.append(Spacer(1, 5))

        edu2 = Table(
            [[Paragraph('<b>Aditya Birla Intermediate College</b>', body_left), Paragraph('<b>Renukoot, Uttar Pradesh</b>', body_right)],
             [Paragraph('<i>12<sup>th</sup> Standard (72%)</i>', sub_body_left), Paragraph('<i>Mar 2024</i>', body_right)],
             [Paragraph('<i>10<sup>th</sup> Standard (87.66%)</i>', sub_body_left), Paragraph('<i>Mar 2022</i>', body_right)]],
            colWidths=[380, 160]
        )
        edu2.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ]))
        story.append(edu2)

        # TECHNICAL SKILLS
        story.append(Spacer(1, 8))
        add_section_header('TECHNICAL SKILLS')

        skills = [
            '• &nbsp; <b>Programming Languages:</b> Java, JavaScript',
            '• &nbsp; <b>Web Technologies:</b> HTML, CSS, React.js, Node.js',
            '• &nbsp; <b>Database & Backend:</b> MongoDB, Express.js',
            '• &nbsp; <b>Tools & Platforms:</b> Git, VS Code, GitHub',
            '• &nbsp; <b>Core Concepts:</b> Data Structures, Problem Solving',
            '• &nbsp; <b>AI & Emerging Skills:</b> Prompt Engineering, AI Integration'
        ]
        for s in skills:
            story.append(Paragraph(s, bullet_style))
            story.append(Spacer(1, 2.5))

        # ACHIEVEMENTS
        story.append(Spacer(1, 6))
        add_section_header('ACHIEVEMENTS')

        achievements = [
            '• &nbsp; Built multiple full-stack projects focused on solving real-world problems and improving user experience.',
            '• &nbsp; Actively exploring open-source contributions and collaborative development.',
            '• &nbsp; Consistently improving development skills through hands-on projects and practical implementation.'
        ]
        for a in achievements:
            story.append(Paragraph(a, bullet_style))
            story.append(Spacer(1, 3))

        doc.build(story)
        shutil.copyfile(pdf_path, alt_pdf_path)
        print('SUCCESS: Bhumika_Singh_Resume.pdf and resume.pdf generated in /public!')

    except Exception as e:
        print('Error generating PDF:', e)

if __name__ == '__main__':
    generate_pdf()

