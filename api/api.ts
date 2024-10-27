// api/api.ts

export const checkEventCode = async (code: string): Promise<{ event_id: string; event_name: string }> => {
    if (code === "VALIDCODE") {
        return { event_id: "123", event_name: "Sample Event" };
    }
    throw new Error("Event not found");
};

export const checkQRCode = async (
    event_id: string,
    qrcode: string
): Promise<{ status: string; ticketInfo?: { name: string; seat: string }; reason?: string }> => {
    if (qrcode === "VALIDQR") {
        return { status: "valid", ticketInfo: { name: "John Doe", seat: "A1" } };
    }
    return { status: "notvalid", reason: "Invalid QR Code" };
};
