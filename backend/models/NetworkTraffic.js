const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const networkTrafficSchema = new Schema({
    protocol_type: {
        type: String,
        enum: ['tcp', 'udp', 'icmp'],
        required: true
    },
    service: {
        type: String,
        enum: [
            'IRC', 'X11', 'Z39_50', 'http_8001', 'auth', 'bgp', 'courier', 'csnet_ns', 'ctf', 'daytime',
            'discard', 'domain', 'domain_u', 'echo', 'eco_i', 'ecr_i', 'efs', 'exec', 'finger', 'ftp', 
            'ftp_data', 'gopher', 'harvest', 'hostnames', 'http', 'http_2784', 'http_443', 'aol', 
            'imap4', 'iso_tsap', 'klogin', 'kshell', 'ldap', 'link', 'login', 'mtp', 'name', 
            'netbios_dgm', 'netbios_ns', 'netbios_ssn', 'netstat', 'nnsp', 'nntp', 'ntp_u', 'other', 
            'pm_dump', 'pop_2', 'pop_3', 'printer', 'private', 'red_i', 'remote_job', 'rje', 'shell', 
            'smtp', 'sql_net', 'ssh', 'sunrpc', 'supdup', 'systat', 'telnet', 'tftp_u', 'tim_i', 
            'time', 'urh_i', 'urp_i', 'uucp', 'uucp_path', 'vmnet', 'whois'
        ],
        required: true
    },
    flag: {
        type: String,
        enum: ['OTH', 'REJ', 'RSTO', 'RSTOS0', 'RSTR', 'S0', 'S1', 'S2', 'S3', 'SF', 'SH'],
        required: true
    },
    logged_in: {
        type: Boolean,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    srv_serror_rate: {
        type: Number,
        required: true
    },
    srv_rerror_rate: {
        type: Number,
        required: true
    },
    same_srv_rate: {
        type: Number,
        required: true
    },
    diff_srv_rate: {
        type: Number,
        required: true
    },
    dst_host_count: {
        type: Number,
        required: true
    },
    dst_host_srv_count: {
        type: Number,
        required: true
    },
    dst_host_same_srv_rate: {
        type: Number,
        required: true
    },
    dst_host_diff_srv_rate: {
        type: Number,
        required: true
    },
    dst_host_same_src_port_rate: {
        type: Number,
        required: true
    },
    dst_host_serror_rate: {
        type: Number,
        required: true
    },
    dst_host_rerror_rate: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const NetworkTraffic = mongoose.model('NetworkTraffic', networkTrafficSchema);

module.exports = NetworkTraffic;
