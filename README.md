Aplicație web pentru organizarea de conferințe 

OBIECTIV: Realizarea unei aplicații web care să permită organizarea și gestionarea conferințelor. 

DESCRIERE: Aplicația web constă în organizarea și gestionarea conferințelor, conținând diferite etape precum trimitere, evaluare și aprobare a articolelor. Aceasta gestionează trei categorii de utilizatori: organizator, autor și recenzor, fiecare având atribuite diferite responsabilități. Platforma va fi dezvoltată ca o aplicație web de tip Single Page Application (SPA), putând fi accesată de pe diferite dispozitive în browser. 

TEHNOLOGII UTILIZATE:
- Partea de front - end  va realizată cu ajutorul framework-ului bazat pe componente React.js  
- Partea de back – end va avea o interfață REST și va fi realizată în Node.js. 
- Stocarea datelor se va face într-o bază de date relațională, accesată prin intermediul unui ORM. 
- Aplicația va fi distribuită pe un server cloud precum Azure, AWS. 

FUNCȚIONALITĂȚI MINIME:
- Aplicația web conține trei tipuri de utilizatori: organizator, autor și recenzor. 
- Organizatorul creează conferințele și poate desemna recenzori care vor evalua articolele. De asemenea, acesta poate urmări evoluția articolelor trimise. 
- Autorul poate participa și trimite o propunere de articol la o conferință. În plus, poate încărca o versiune actualizată a articolului pe baza recenziilor primite. 
- Doi recenzori sunt atribuiți automat către articol și îl pot evalua și oferi feedback autorului pentru modificări. 