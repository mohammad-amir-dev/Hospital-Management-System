const arrayToCSV = (arr: string[]) => {
    console.log(arr);
    if (!arr || arr.length === 0) return null;
    return arr.join(", ");
}

const capitalizeFirstLetter = (string: string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1)?.toLowerCase();
};
const addZeroMonths = (data: any[], monthKey: string, valueKey: string) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const result = months.map((month) => {
        const found = data.find((item) => item[monthKey] === month);
        return found ? found : { [monthKey]: month, [valueKey]: 0 };
    });
    return result;
}
const convertReasonChartData = (data: any[]) => {
    const colors = ["#4caf50", "#2196f3", "#ff9800", "#f44336", "#9c27b0", "#3f51b5", "#00bcd4", "#8bc34a", "#ffc107", "#e91e63"];
    return data.map((item, index) => ({
        name: item.reason,
        value: item.count,
        color: colors[index % colors.length] // Cycle through colors if more reasons than colors
    }));
}
export { arrayToCSV, capitalizeFirstLetter, addZeroMonths, convertReasonChartData };