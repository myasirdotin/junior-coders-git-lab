/**
 * Junior Coders - Networks practice (Learning Networks/exercises.html), run by js/practice-cards.js.
 * Format: see the header of js/practice-cards.js. Nothing here sends real network traffic: most tasks are
 * choice / fill / order / bug / predict; the two `js` tasks run small calculations in a Web Worker and are compared
 * with the solution. After any edit: node scripts/check-practice.js
 * Lessons: 1 Internet & Packets (ch1), 2 OSI & TCP/IP (ch2), 3 IP, CIDR & NAT (ch3), 4 TCP vs UDP (ch4–5),
 * 5 DNS (ch6), 6 HTTP (ch7–9), 7 HTTPS, TLS 1.3 & CORS (ch10–11), 8 WebSockets, REST & Diagnostics (ch12–13);
 * ch14 is the capstone. Addresses are documentation or private ranges only; scenarios follow GEMINI §1.
 */
(window.JC_PRACTICE = window.JC_PRACTICE || {}).networks = [
    // ── Tier 1: warm-up ──
    {
        id: 'choice-router', tier: 1, type: 'choice', title: 'Joining the lab to the Internet', module: 1, chapter: 1,
        task: 'The school computer lab is one small network. Which device joins it to <em>other</em> networks, such as the Internet, and chooses where to send packets using IP addresses?',
        options: ['A switch', 'A router', 'A network cable', 'A web server'],
        answer: 1,
        why: 'A <strong>switch</strong> joins devices <em>inside</em> one LAN using MAC addresses. A <strong>router</strong> joins <em>different</em> networks (the LAN to the WAN) and picks a route using IP addresses.'
    },
    {
        id: 'choice-osi-layer', tier: 1, type: 'choice', title: 'Where do IP addresses live?', module: 2, chapter: 2,
        task: 'In the OSI model, which layer handles IP addresses and routes packets across networks?',
        options: ['Layer 2: Data Link', 'Layer 3: Network', 'Layer 4: Transport', 'Layer 7: Application'],
        answer: 1,
        why: 'Layer 3, the <strong>Network</strong> layer, is where IP and routers work. Its data unit is the <em>packet</em>. Layer 2 uses MAC addresses for the next device; layer 4 uses ports for the right program.'
    },
    {
        id: 'choice-private-ip', tier: 1, type: 'choice', title: 'Which address is private?', module: 3, chapter: 3,
        task: 'A clinic is planning its Wi-Fi. Which of these addresses is in a <strong>private</strong> range, free to use inside any building?',
        options: ['<code>203.0.113.5</code>', '<code>198.51.100.20</code>', '<code>172.20.1.9</code>', '<code>192.0.2.44</code>'],
        answer: 2,
        why: 'The three private ranges are <code>10.0.0.0/8</code>, <code>172.16.0.0/12</code> (172.16 to 172.31) and <code>192.168.0.0/16</code>. <code>172.20.1.9</code> sits inside 172.16 to 172.31. The other three are public-style addresses kept for examples in books.'
    },
    {
        id: 'fill-port-https', tier: 1, type: 'fill', title: 'The door for HTTPS', module: 4, chapter: 5,
        task: 'The library website uses HTTPS. Which port number must the firewall open so visitors can reach it?',
        code: 'Allow: Internet → library web server, TCP port ____ (HTTPS)',
        answers: ['443'],
        why: 'HTTPS uses well-known port <strong>443</strong>. Plain HTTP uses 80, SSH 22, DNS 53 and MySQL 3306. Only open the ports a service really needs.'
    },
    {
        id: 'fill-dns-a', tier: 1, type: 'fill', title: 'Name to IPv4 address', module: 5, chapter: 6,
        task: 'Which DNS record type turns a name into an <strong>IPv4</strong> address?',
        code: 'library.example.org   ____   203.0.113.10',
        answers: ['A'],
        why: 'An <strong>A</strong> record maps a name to an IPv4 address. <strong>AAAA</strong> does the same for IPv6, <strong>CNAME</strong> points to another name and <strong>MX</strong> says where email goes.'
    },
    {
        id: 'choice-status-404', tier: 1, type: 'choice', title: 'Page not found', module: 6, chapter: 7,
        task: 'A student types a wrong address and the server replies <code>404 Not Found</code>. Which class of status code is this?',
        options: ['2xx: success', '3xx: look somewhere else', '4xx: the client made a mistake', '5xx: the server failed'],
        answer: 2,
        why: 'The first digit gives the class. <code>4xx</code> means the request had a problem (here, a path that does not exist). <code>5xx</code> would mean the server itself broke.'
    },

    // ── Tier 2: apply ──
    {
        id: 'order-tcp-handshake', tier: 2, type: 'order', title: 'The TCP 3-way handshake', module: 4, chapter: 4,
        task: 'A laptop opens a TCP connection to the school server. Put the messages in order. Look at the numbers: each <code>ack</code> is the other side\'s number plus 1.',
        steps: [
            'Laptop → server: SYN, seq=1000',
            'Server → laptop: SYN-ACK, seq=5000, ack=1001',
            'Laptop → server: ACK, ack=5001',
            'Both sides start sending data'
        ],
        why: 'SYN asks "can we talk?", SYN-ACK says "yes, I got 1000", ACK says "got your 5000, let\'s begin". Only after these three messages is the connection ESTABLISHED and data can flow.'
    },
    {
        id: 'predict-clinic-26', tier: 2, type: 'predict', title: 'Devices in the clinic subnet', module: 3, chapter: 3,
        task: 'A health clinic is given the subnet <code>192.168.10.0/26</code>. How many devices (usable host addresses) can it have?',
        code: 'Subnet:      192.168.10.0/26\nHost bits:   32 - 26 = ?\nTotal:       2 ^ host bits = ?\nUsable:      ?',
        answers: ['62', '62 hosts', '62 devices', '62 usable hosts'],
        why: '/26 leaves 32 − 26 = 6 host bits, so 2⁶ = 64 addresses. Take away 2: the first is the network address and the last is the broadcast address. That leaves <strong>62</strong> usable hosts (192.168.10.1 to 192.168.10.62).'
    },
    {
        id: 'order-dns-lookup', tier: 2, type: 'order', title: 'Following a DNS lookup', module: 5, chapter: 6,
        task: 'Nobody has looked up <code>library.example.org</code> today, so nothing is cached. Put the steps of the lookup in order.',
        steps: [
            'The browser asks the recursive resolver for library.example.org',
            'The resolver asks a root server, which says "ask the .org TLD server"',
            'The resolver asks the .org TLD server, which says "ask ns1.example.org"',
            'The resolver asks the authoritative server, which answers 203.0.113.10',
            'The resolver gives the answer to the browser and keeps a copy in its cache'
        ],
        why: 'The resolver does the asking for you, from the most general server to the most specific: root, then TLD, then authoritative. It caches the answer for the record\'s TTL, so the next person gets it at once.'
    },
    {
        id: 'bug-request-line', tier: 2, type: 'bug', title: 'A muddled request', module: 6, chapter: 7,
        task: 'This HTTP request should send a donation to the charity\'s API, but the server answers <code>400 Bad Request</code>. Tap the line with the mistake.',
        lines: [
            'HTTP/1.1 POST /api/donations',
            'Host: relief.example.org',
            'Content-Type: application/json',
            'Content-Length: 42'
        ],
        bad: 0,
        fix: 'POST /api/donations HTTP/1.1',
        why: 'A request line is always <strong>method, path, version</strong>: <code>POST /api/donations HTTP/1.1</code>. The version comes first only in a <em>response</em> status line, such as <code>HTTP/1.1 201 Created</code>.'
    },
    {
        id: 'choice-401-403', tier: 2, type: 'choice', title: 'Logged in, but not allowed', module: 6, chapter: 7,
        task: 'Yusuf is logged in to the school portal as a student. He opens the page where teachers enter marks. The server knows who he is, but says he may not see it. Which status code fits best?',
        options: ['<code>200 OK</code>', '<code>401 Unauthorized</code>', '<code>403 Forbidden</code>', '<code>500 Internal Server Error</code>'],
        answer: 2,
        why: '<code>403 Forbidden</code> means "I know who you are, but you are not allowed". <code>401</code> really means "not logged in": the server does not know who you are yet.'
    },
    {
        id: 'bug-curl-exe', tier: 2, type: 'bug', title: 'Climbing the troubleshooting ladder', module: 8, chapter: 13,
        task: 'Amina checks the school library site in <strong>Windows PowerShell 5</strong>, one step at a time. The last command does not show curl\'s request and response lines. Tap the line with the mistake.',
        lines: [
            'ipconfig',
            'ping 192.168.1.1',
            'nslookup library.example.org',
            'curl -v -o NUL http://library.example.org/'
        ],
        bad: 3,
        fix: 'curl.exe -v -o NUL http://library.example.org/',
        why: 'In Windows PowerShell 5, plain <code>curl</code> is a nickname (alias) for <code>Invoke-WebRequest</code>, a different command. Type <code>curl.exe</code> to run the real curl. The ladder itself is right: address, router, name, then web server.'
    },
    {
        id: 'js-usable-hosts', tier: 2, type: 'js', title: 'A subnet calculator', module: 3, chapter: 3,
        task: 'Write a small JavaScript function <code>usableHosts(prefix)</code>. Given a CIDR prefix such as 24, it returns the number of usable host addresses: 2 to the power of (32 − prefix), minus 2. In JavaScript, <code>2 ** 6</code> means 2 to the power 6 (64).',
        starter: 'function usableHosts(prefix) {\n    // host bits = 32 - prefix\n    // return 2 to the power of host bits, minus 2\n}',
        solution: 'function usableHosts(prefix) {\n    const hostBits = 32 - prefix;\n    return 2 ** hostBits - 2;\n}',
        tests: [
            { expr: 'usableHosts(24)', label: 'usableHosts(24) (a whole lab)' },
            { expr: 'usableHosts(26)', label: 'usableHosts(26) (the clinic)' },
            { expr: 'usableHosts(28)' },
            { expr: 'usableHosts(30)', label: 'usableHosts(30) (a link between two routers)' },
            { expr: 'usableHosts(16)' }
        ],
        hint1: 'First work out the host bits: <code>const hostBits = 32 - prefix;</code>',
        hint2: 'Then <code>return 2 ** hostBits - 2;</code> (the network and broadcast addresses cannot be given to devices).',
        why: 'The same rule fills the whole CIDR table: /24 gives 254, /26 gives 62, /28 gives 14, /30 gives 2 and /16 gives 65,534.'
    },

    // ── Tier 3: challenge ──
    {
        id: 'predict-broadcast', tier: 3, type: 'predict', title: 'The library\'s broadcast address', module: 3, chapter: 3,
        task: 'A school splits <code>198.51.100.0/24</code> into four /26 subnets. The library gets the second one, <code>198.51.100.64/26</code>. What is its <strong>broadcast</strong> address?',
        code: 'Subnet:     198.51.100.64/26\nAddresses:  64 (from .64 onwards)\nFirst host: 198.51.100.65\nBroadcast:  ?',
        answers: ['198.51.100.127'],
        why: 'A /26 holds 64 addresses, so this subnet runs from .64 to .64 + 63 = <strong>.127</strong>. The last address (all host bits 1) is the broadcast address. The usable hosts are .65 to .126.'
    },
    {
        id: 'order-tls13', tier: 3, type: 'order', title: 'The TLS 1.3 handshake', module: 7, chapter: 10,
        task: 'A student opens <code>https://school.example.org</code>. Put the steps of the secure connection in order.',
        steps: [
            'The TCP 3-way handshake finishes',
            'ClientHello: the list of ciphers and the client\'s key share',
            'ServerHello: the chosen cipher and the server\'s key share (everything after this is encrypted)',
            'Certificate: the server sends its certificate with its long-term public key',
            'CertificateVerify: the server signs the handshake with its private key',
            'Finished: both sides send a check value over the whole handshake',
            'The browser sends the HTTP request, encrypted'
        ],
        why: 'TLS 1.3 needs only one round trip after TCP. After the two key shares, both sides can work out the same secret, so the certificate is already sent encrypted. CertificateVerify proves the server owns the certificate, and Finished catches any changed message.'
    },
    {
        id: 'bug-cors-preflight', tier: 3, type: 'bug', title: 'The preflight that says no', module: 7, chapter: 11,
        task: 'The charity\'s page at <code>https://portal.charity.example.org</code> sends a <code>POST</code> with JSON and an <code>Authorization</code> header to <code>https://api.charity.example.org/v1/donations</code>. The browser sends a preflight <code>OPTIONS</code> request, and this is the API\'s answer. The browser still blocks the POST. Tap the line with the mistake.',
        lines: [
            'HTTP/1.1 204 No Content',
            'Access-Control-Allow-Origin: https://api.charity.example.org',
            'Access-Control-Allow-Methods: GET, POST, OPTIONS',
            'Access-Control-Allow-Headers: Content-Type, Authorization',
            'Access-Control-Max-Age: 86400'
        ],
        bad: 1,
        fix: 'Access-Control-Allow-Origin: https://portal.charity.example.org',
        why: 'The page and the API have different hosts, so they are different origins. <code>Access-Control-Allow-Origin</code> must name the origin of the <strong>page</strong> that asks (the portal), not the API itself. The preflight happens because the request sends JSON and an <code>Authorization</code> header.'
    },
    {
        id: 'bug-firewall', tier: 3, type: 'bug', title: 'One rule too many', chapter: 14,
        task: 'Here are the firewall rules for a community portal: a load balancer, web servers in a web subnet and a database in a data subnet. One rule puts everyone\'s data at risk. Tap it.',
        lines: [
            'Internet → load balancer: TCP 443 and UDP 443 (HTTPS and HTTP/3)',
            'Internet → load balancer: TCP 80 (only to redirect to HTTPS)',
            'Load balancer → web subnet: TCP 443',
            'Internet → data subnet: TCP 3306 (database)',
            'Web subnet → data subnet: TCP 3306'
        ],
        bad: 3,
        fix: 'Delete this rule. Only the web subnet may reach the database on port 3306 (the last rule already allows that).',
        why: 'Allow only what is needed and block everything else. The database port <code>3306</code> must never be open to the Internet. Keeping it two walls away protects the records people trusted us with (<em>Amānah</em>).'
    },
    {
        id: 'js-status-class', tier: 3, type: 'js', title: 'Name the status class', module: 6, chapter: 7,
        task: 'Write a JavaScript function <code>statusClass(code)</code> that returns the class of an HTTP status code as text: <code>"information"</code> for 1xx, <code>"success"</code> for 2xx, <code>"redirect"</code> for 3xx, <code>"client error"</code> for 4xx and <code>"server error"</code> for 5xx.',
        starter: 'function statusClass(code) {\n    // look at the first digit of the code\n}',
        solution: 'function statusClass(code) {\n    const first = Math.floor(code / 100);\n    if (first === 1) return "information";\n    if (first === 2) return "success";\n    if (first === 3) return "redirect";\n    if (first === 4) return "client error";\n    return "server error";\n}',
        tests: [
            { expr: 'statusClass(101)' },
            { expr: 'statusClass(201)' },
            { expr: 'statusClass(304)' },
            { expr: 'statusClass(403)' },
            { expr: 'statusClass(404)' },
            { expr: 'statusClass(502)' }
        ],
        hint1: 'The first digit is <code>Math.floor(code / 100)</code>: for 404 that is 4.',
        hint2: 'Then use <code>if (first === 1) return "information";</code> and so on for 2, 3 and 4; anything left is <code>"server error"</code>.',
        why: 'Only the first digit decides the class, so one division is enough. Tools like DevTools and curl do the same when they colour 4xx and 5xx replies as problems.'
    }
];
