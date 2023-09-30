const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

const offset = 60;

class Chart {
    constructor({title, data}){
        this.title = title;
        this.data = data;

        this.drawChart();
        this.drawLabel();
        this.drawLine();
    }

    drawChart(){
        c.strokeStyle = 'black';
        c.beginPath();    
        c.lineTo(offset, offset);
        c.lineTo(offset, canvas.height - offset);
        c.stroke();
        c.closePath();    

        c.beginPath();    
        c.lineTo(offset, canvas.height - offset);
        c.lineTo(canvas.width - offset, canvas.height - offset);
        c.stroke();
        c.closePath();    
    }

    drawLabel(){
        c.font = '15px Arial';
        this.labels = Object.keys(this.data[0]);
        this.labels.forEach((label, i) => {
            label = label[0].toUpperCase() + label.slice(1);
            let textWidth = c.measureText(label).width;
            let x, y;
            if(i == 0){
                x = canvas.width - offset;
                y = canvas.height - offset + 4;
            }else {
                x = offset - textWidth / 2;
                y = offset - 5;
            }

            c.fillText(label, x, y);
        });


        // jumlah
        c.font = '12px Arial';
        this.jumlah = this.data.map(d => d.jumlah);
        this.maxJumlah = Math.max(...this.jumlah);
        this.minJumlah = Math.min(...this.jumlah);

        for(let i = 0; i < 5; i++){
            let jumlah;
            if(i == 0){
                jumlah = this.minJumlah;
            }else if(i == 4){
                jumlah = this.maxJumlah;
            }else {
                jumlah = this.minJumlah + 14 * i;
            }

            const textWidth = c.measureText(jumlah).width;
            const x = offset - textWidth - 10;
            const y = (canvas.height - offset * 2) * (1 - (jumlah - this.minJumlah / 2) / this.maxJumlah) + offset;
            c.fillText(jumlah, x, y);

            c.beginPath();
            c.lineTo(x + textWidth + 5, y - 4);
            c.lineTo(x + textWidth + 10, y - 4);
            c.stroke();
            c.closePath();
        }

        // tanggal
        this.tanggal = this.data.map(d => d.tanggal);
        this.maxTanggal = Math.max(...this.tanggal);
        this.minTanggal = Math.min(...this.tanggal);

        this.tanggal.forEach(tanggal => {
            const textWidth = c.measureText(tanggal).width;
            const x = (canvas.width - offset * 2) * ((tanggal - this.minTanggal / 1.2) / (this.maxTanggal - this.minTanggal / 2)) + offset;
            const y = canvas.height - offset + 12 + 10; 
            c.fillText(tanggal, x, y);

            c.beginPath();
            c.lineTo(x + textWidth / 2, y - 12 - 5);
            c.lineTo(x + textWidth / 2, y - 12 - 10);
            c.stroke();
            c.closePath();
        });
    }

    drawLine(){
        c.strokeStyle = 'red';
        c.lineWidth = 2;
        c.lineCap = 'round';
        c.beginPath();
        this.data.forEach(({tanggal, jumlah}) => {
            const x = (canvas.width - offset * 2) * ((tanggal - this.minTanggal / 1.2) / (this.maxTanggal - this.minTanggal / 2)) + offset;
            const y = (canvas.height - offset * 2) * (1 - (jumlah - this.minJumlah / 2) / this.maxJumlah) + offset;
            c.lineTo(x, y);
        });
        c.stroke();
        c.closePath();
    }
}


let chart = new Chart({
    title: "Data Covid Jakarta Oktober",
    data: [
        {
            tanggal: 1,
            jumlah: 13,
        },
        {
            tanggal: 2,
            jumlah: 20,
        },
        {
            tanggal: 3,
            jumlah: 70,
        },
        {
            tanggal: 4,
            jumlah: 40,
        },
        {
            tanggal: 5,
            jumlah: 60,
        },
        {
            tanggal: 6,
            jumlah: 20,
        },
        {
            tanggal: 7,
            jumlah: 50,
        },
        {
            tanggal: 8,
            jumlah: 30,
        },
    ]
})
