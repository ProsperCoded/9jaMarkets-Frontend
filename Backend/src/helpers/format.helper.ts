export class DataFormatterHelper {

    static formatPhoneNumbers(phoneNumbers: string[], customerId?: string, marketId?: string): { number: string, isPrimary: boolean, customerId?: string, marketId?: string }[] {
        return phoneNumbers.map((number, index) => {
            return {
                number,
                isPrimary: index === 0,
                customerId,
                marketId
            }
        });
    }

    static formatDate(date: string | Date): Date {
        return new Date(date);
    }

    static formatDatabaseObject<T>(
        data: { [key: string]: any },
        others?: (keyof Omit<T, "createdAt" | "updatedAt" | "deletedAt" | "id">)[],
        id?: "id"
    ): void {
        let fieldsToDelete = ["createdAt", "updatedAt", "deletedAt"];
        if (!id) {
            fieldsToDelete.push("id");
        }

        // Deleted Specified Fields
        fieldsToDelete.forEach((field) => {
                delete data[field];
        });

        // Delete other fields if specified
        if (others) {
            others.forEach((field) => {
                delete data[field as string];
            });
        }
         // Recursively format nested objects and arrays
        for (let key in data) {
            if (Array.isArray(data[key]) && data[key].length) {
                data[key] = data[key].map((item: any) => {
                    if (typeof item === "object") {
                        this.formatDatabaseObject(item);
                    }
                    return item;
                });
            } else if (typeof data[key] === "object" && data[key] !== null && Object.keys(data[key]).length > 0) {
                this.formatDatabaseObject(data[key]);
            }
        }
    }
}