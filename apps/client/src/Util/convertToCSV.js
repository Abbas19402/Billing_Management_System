const Utility = {
    export: (data, filename) => Export.CSV(data, filename)
}

const Export = {
    CSV: (data, filename) => {
        const csvString = convertToCSV(data);
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
    }
}

function convertToCSV(data) {
    const header = Object.keys(data[0]);
    const csvContent = [
        header.join(','),
        ...data.map(row => Object.values(row).join(',')),
    ];
    return csvContent.join('\n');
}
export default Utility