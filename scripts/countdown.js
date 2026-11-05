export function updateCooldown(date){
    let dateButoire = new Date(date);
    const actualDate = new Date();
    const diff = dateButoire - actualDate;
    if(diff <= 0 || diff === null){
        return false;
    }else{
        const dateRest = {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60)
        }
        return dateRest;
    }
}