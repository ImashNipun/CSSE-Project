import QRCode from 'react-native-qrcode-svg';
import { Alert } from 'react-native';

const displayQRCode = (data) => {
    console.log(data);
    Alert.alert(
        "Journey Details QR Code",
        "Here is the QR code for your journey details.",
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            {
                text: "OK", onPress: () => console.log("OK Pressed")
            }
        ],
        {
            cancelable: false,
            // Custom view for the content area of the alert
            content: (
                <QRCode
                    value={JSON.stringify(data)}
                    size={200}
                />
            )
        }
    );
};
export default displayQRCode;
