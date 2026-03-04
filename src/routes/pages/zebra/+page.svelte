<script lang="ts">
	import net from 'net';

	function printLabel() {
		const printerHost = 'd6j235201761.home.arpa';
		const printerPort = 9100;

		const now = new Date();
		const timestring = now.toISOString().slice(0, 10); // "YYYY-MM-DD"

		const zplCommand = `
^XA
^LH16,8
^FO100,15
^AB,20
^FDFrysdag^FS
^FO50,50
^A0,40
^FD${timestring}^FS
^LH0,0
^XZ
`;

		const client = new net.Socket();

		client.connect(printerPort, printerHost, () => {
			console.log('Connected to printer!');
			client.write(zplCommand, 'utf8', () => {
				console.log('Sent ZPL to printer!');
				client.end();
			});
		});

		client.on('error', (err) => {
			console.error('Connection failed:', err);
		});

		client.on('close', () => {
			console.log('Connection closed');
		});
	}
</script>

Nope, this will not work. Have to make a proxy..
<button class="btn preset-filled" onclick={printLabel}>Skriv ut!</button>
