import {
  Document,
  Image as PDFImage,
  Font,
  PDFDownloadLink,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { Guest } from "../../../../types/Guest";
import QRCode from "qrcode";
import { Button } from "@nextui-org/react";

interface TicketProps {
  ticket: Guest;
}

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    backgroundColor: "#FFF",
    padding: 20,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    border: "2px solid #000",
    borderRadius: 10,
    overflow: "hidden",
  },
  left: {
    width: "25%",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderRight: "1px solid transparent",
    borderImage:
      "repeating-linear-gradient(to bottom, #A9A9A9, #A9A9A9 5px, transparent 5px, transparent 10px) 1",
  },
  right: {
    width: "75%",
    padding: 15,
  },
  eventInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  qrcode: {
    width: "100%",
    height: "auto",
  },
  seating: {
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: 5,
    padding: 5,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 3,
  },
  eventSection: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    gap: 3,
    alignItems: "flex-start",
    borderRight: "1px solid black",
  },
  headerText: {
    fontSize: 18,
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  eventCol: {
    width: "60%",
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },
  eventRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eventItem: {
    display: "flex",
    flexdirection: "column",
    alignItems: "flex-start",
    textTransform: "uppercase",
    fontSize: 10,
    width: "45%",
    textAlign: "left",
  },
  category: {
    color: "#000",
    opacity: 0.8,
  },
  venue: {
    display: "flex",
    flexdirection: "column",
    alignItems: "flex-start",
    textTransform: "uppercase",
    fontSize: 10,
    width: "100%",
    textAlign: "left",
  },
  personalSection: {
    width: "40%",
  },
  personalInfo: {
    textAlign: "right",
    fontSize: 12,
  },
  logo: {
    width: "80%",
    height: "auto",
  },
  note: {
    fontSize: 9,
    textAlign: "left",
    color: "#000",
    opacity: 0.8,
  },
});

export function TicketPDF({ ticket }: TicketProps) {
  const { title, firstName, lastName, matricNumber, email, seat } = ticket;

  const [qrCodeUrl, setQRCodeUrl] = useState("");

  useEffect(() => {
    const generateQRCode = async (text: string) => {
      try {
        const url = await QRCode.toDataURL(text);
        setQRCodeUrl(url);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQRCode(matricNumber);
  }, [matricNumber]);

  const initials = (firstName: string, lastName: string): string => {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return firstInitial + lastInitial;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.left}>
            {qrCodeUrl && <PDFImage src={qrCodeUrl} style={styles.qrcode} />}
            <View style={styles.seating}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 3,
                  fontSize: 10,
                  textAlign: "left",
                }}
              >
                <Text>ENTRY:</Text>
                <Text style={{ fontWeight: "bold" }}>FREE</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 3,
                  fontSize: 10,
                  textAlign: "left",
                }}
              >
                <Text>SEAT:</Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {seat}'S SIDE
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.right}>
            <Text style={styles.headerText}>The Traditional Wedding</Text>
            <Text style={styles.subHeaderText}>2024 Set</Text>
            <Text
              style={{
                fontSize: 9,
                color: "#000",
                opacity: 0.8,
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              Invitation ticket for attendees and guests
            </Text>
            <View style={styles.eventInfo}>
              <View style={styles.eventCol}>
                <View style={styles.eventRow}>
                  <View style={styles.eventItem}>
                    <Text style={styles.category}>Date:</Text>
                    <Text>July 19, 2024</Text>
                  </View>
                  <View style={styles.eventItem}>
                    <Text style={styles.category}>Time:</Text>
                    <Text>10:00 AM</Text>
                  </View>
                </View>
                <View style={styles.venue}>
                  <Text style={styles.category}>Venue:</Text>
                  <Text>University of Abuja, Faculty of Law</Text>
                </View>
                <View style={styles.eventRow}>
                  <View style={styles.eventItem}>
                    <Text style={styles.category}>Dress-code:</Text>
                    <Text>Trad. Attire</Text>
                  </View>
                  <View style={styles.eventItem}>
                    <Text style={styles.category}>RSVP:</Text>
                    <Text>Sarah</Text>
                    <Text>08158386342</Text>
                  </View>
                </View>
              </View>
              <View style={styles.personalSection}>
                <View style={styles.personalInfo}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                      }}
                    >
                      {title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                      }}
                    >
                      {firstName} {lastName}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                      textTransform: "uppercase",
                      marginVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                      }}
                    >
                      {seat}'s
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                      }}
                    >
                      Relative
                    </Text>
                  </View>
                </View>
                <Text style={styles.note}>
                  This document is the basis for entry at the event. Present it
                  to the concierge.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

// export default function DownloadableTicket({ ticket }: TicketProps) {
//   return (
//     <PDFDownloadLink
//       document={<TicketPDF ticket={ticket} />}
//       fileName="lawsan-ticket.pdf"
//     >
//       {({ blob, url, loading, error }) =>
//         loading ? "Generating PDF..." : "Download Ticket"
//       }
//     </PDFDownloadLink>
//   );
// }

export function DownloadButton({ ticket }: TicketProps) {
  const [isReady, setIsReady] = useState(false);

  return (
    <PDFDownloadLink
      document={<TicketPDF ticket={ticket} />}
      fileName="lawsan-ticket.pdf"
    >
      {({ blob, url, loading, error }) => {
        if (!loading && !isReady) {
          setIsReady(true);
        }

        return (
          <Button isDisabled={!isReady}>
            {loading ? "Generating PDF..." : "Download Ticket"}
          </Button>
        );
      }}
    </PDFDownloadLink>
  );
}
