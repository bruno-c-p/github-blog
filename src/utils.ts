import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(date: string) {
    return formatDistance(new Date(date), new Date(), { addSuffix: true, locale: ptBR });
}