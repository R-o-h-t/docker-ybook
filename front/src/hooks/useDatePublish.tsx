export const useDatePublish = (date: Date) => {

    let printDate = "";

    const duration = new Date().getTime() - new Date(date).getTime();
    const durationInDays = Math.floor(duration / (1000 * 60 * 60 * 24));

    if(durationInDays<1){
        printDate = 'Aujourd\'hui';
    } else if (durationInDays>1 && durationInDays<2){
        printDate = 'Hier';
    } else if (durationInDays>=2 && durationInDays<7){
        printDate = 'Il y a ' + durationInDays + ' jours';
    } else if(durationInDays>=7) {
        printDate = new Date(date).toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'});

    }

    return printDate;
}