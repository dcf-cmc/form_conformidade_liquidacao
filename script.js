document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('form-container');
    const pdfContainer = document.getElementById('pdf-copy-container');
    const generateBtn = document.getElementById('generate-btn');
    const backBtn = document.getElementById('back-btn');
    const printBtn = document.getElementById('print-btn');

    const processoInput = document.getElementById('processo');
    const fornecedorInput = document.getElementById('fornecedor');
    const pdfProcesso = document.getElementById('pdf-processo');
    const pdfFornecedor = document.getElementById('pdf-fornecedor');

    processoInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 5) {
            value = value.slice(0, 5) + '/' + value.slice(5, 9);
        }
        e.target.value = value;
    });

    generateBtn.addEventListener('click', () => {

        pdfProcesso.textContent = processoInput.value || '_______________________';
        pdfFornecedor.textContent = fornecedorInput.value || '_______________________';

        document.querySelectorAll('.pdf-mark').forEach(cell => {
            cell.textContent = '';
        });
        const allCheckboxes = document.querySelectorAll('#checklist-form input[type="checkbox"]');
        allCheckboxes.forEach(checkbox => {
            const id = checkbox.getAttribute('data-id');
            const pdfCell = document.querySelector(`.pdf-mark[data-pdf-id="${id}"]`);
            if (pdfCell) {
                pdfCell.textContent = checkbox.checked ? '✅' : '❌';
            }
        });

        formContainer.style.display = 'none';
        pdfContainer.style.display = 'block';
        window.scrollTo(0, 0);
    });

    backBtn.addEventListener('click', () => {
        pdfContainer.style.display = 'none';
        formContainer.style.display = 'block';
    });

    printBtn.addEventListener('click', () => {
        const processo = processoInput.value || 'sem-numero';
        const fornecedor = fornecedorInput.value || 'sem-fornecedor';
        const originalTitle = document.title;

        // Define o título que será usado como nome do arquivo PDF
        document.title = `Checklist de Auditoria de Conformidade - Divisão de Contas a Pagar - PA ${processo} - ${fornecedor}`;

        window.print();

        // Restaura o título original após a impressão
        document.title = originalTitle;
    });
});
