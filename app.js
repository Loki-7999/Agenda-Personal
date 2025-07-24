document.addEventListener('DOMContentLoaded', () => {
  // Notas dinámicas
  const notasSection = document.getElementById('notas-section');
  if (notasSection) {
    let notasArr = JSON.parse(localStorage.getItem('notasArr') || '[]');
    const saveNotas = () => localStorage.setItem('notasArr', JSON.stringify(notasArr));

    function renderNotas() {
      notasSection.innerHTML = '';
      notasArr.forEach((texto, idx) => {
        const div = document.createElement('div');
        div.className = 'nota-card';
        const textarea = document.createElement('textarea');
        textarea.value = texto;
        textarea.id = `nota-${idx}`;
        textarea.placeholder = 'Escribe tus notas aquí...';
        textarea.addEventListener('input', () => {
          notasArr[idx] = textarea.value;
          saveNotas();
        });
        div.appendChild(textarea);
        notasSection.appendChild(div);
      });
    }

    document.getElementById('add-nota').addEventListener('click', () => {
      notasArr.push('');
      saveNotas();
      renderNotas();
    });

    renderNotas();
  }

  // Registro
  const registroBody = document.getElementById('registro-body');
  if (registroBody) {
    registroBody.innerHTML = localStorage.getItem('registro') 
      || '<tr><td contenteditable></td><td contenteditable></td><td contenteditable></td></tr>';
    const saveRegistro = () => localStorage.setItem('registro', registroBody.innerHTML);
    registroBody.addEventListener('input', saveRegistro);
    document.getElementById('add-row').addEventListener('click', () => {
      const tr = document.createElement('tr');
      tr.innerHTML = '<td contenteditable></td><td contenteditable></td><td contenteditable></td>';
      registroBody.appendChild(tr);
      saveRegistro();
    });
  }

  // Datos del Mes
  const mesBody = document.getElementById('mes-body');
  if (mesBody) {
    if (localStorage.getItem('mes')) {
      mesBody.innerHTML = localStorage.getItem('mes');
    } else {
      const meses = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO',
                     'JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
      meses.forEach(m => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${m}</td><td contenteditable></td>`;
        mesBody.appendChild(tr);
      });
    }
    mesBody.addEventListener('input', () => {
      localStorage.setItem('mes', mesBody.innerHTML);
    });
  }
});
