import dayjs from "dayjs";

export const dateFormatter = (date: number) => {
    return dayjs(date).format("DD.MM.YYYY")
}