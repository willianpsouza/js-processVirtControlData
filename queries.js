
const Pool = require('pg').Pool
    const dbuser = process.env.DBUSER || 'root'
    const dbpass = process.env.DBPASS || 'toor'
    const dbhost = process.env.DBHOST || '127.0.0.1'
    const dbname = process.env.DBNAME || 'virt_manager'

    const pool = new Pool({
        user: dbuser,
        host: dbhost,
        database: dbname,
        password: dbpass,
        port: 5432,
    });

const queriesBase = (data) => {
    let basedata = {}
    basedata.insertVirtManagerData = 'INSERT INTO public.virt_manager_data VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24);';
    if(data in basedata){
        return basedata[data]
    }
    return ''
}

const setData = async (request, response) => {
    let request_data = request.body;
    let p_key = request_data.key;
    let p_host = request_data.host;
    let p_vm_proc_id = request_data.vm_proc_id;
    let p_vm_name = request_data.vm_name;
    let p_cpu_total = request_data.cpu_total;
    let p_cpu_usage = request_data.cpu_usage;
    let p_memory_allocated = request_data.memory_allocated;
    let p_host_memory_usage = request_data.host_memory_usage;
    let p_host_memory_peak = request_data.host_memory_peak;
    let p_host_memory_swap = request_data.host_memory_swap;
    let p_context_switch = request_data.context_switch;
    let p_net_tx_pkts = parseFloat(request_data.net_tx_pkts);
    let p_net_rx_pkts = parseFloat(request_data.net_rx_pkts);
    let p_net_tx_bytes = parseFloat(request_data.net_tx_bytes);
    let p_net_rx_bytes = parseFloat(request_data.net_rx_bytes);
    let p_disk_total = request_data.disk_total;
    let p_disk_read_reqs_sec = parseFloat(request_data.disk_read_reqs_sec);
    let p_disk_write_reqs_sec = parseFloat(request_data.disk_write_reqs_sec);
    let p_disk_read_bytes_sec = parseFloat(request_data.disk_read_bytes_sec);
    let p_disk_write_bytes_sec = parseFloat(request_data.disk_write_bytes_sec);
    let p_disk_physical = request_data.disk_physical;
    let p_disk_capacity = request_data.disk_capacity;
    let p_sumarized = request_data.sumarized;
    let p_clock = request_data.clock;

    pool.query(queriesBase('insertVirtManagerData'), [p_key, p_host, p_vm_proc_id, p_vm_name, p_cpu_total, p_cpu_usage, p_memory_allocated, p_host_memory_usage, p_host_memory_peak, p_host_memory_swap, p_context_switch, p_net_tx_pkts, p_net_rx_pkts, p_net_tx_bytes, p_net_rx_bytes, p_disk_total, p_disk_read_reqs_sec, p_disk_write_reqs_sec, p_disk_read_bytes_sec, p_disk_write_bytes_sec, p_disk_physical, p_disk_capacity, p_sumarized, p_clock, ], (error, results) => {
        if (error) {
            throw error
        }
        return response.status(200).json('ok');
    });
}

const setMassData = async (request, response) => {
    let rdata = request.body;
    const client = await pool.connect()
    try {
        await client.query('BEGIN');
        let request_massive_data = rdata.data;      
            for(let c in request_massive_data){
                let request_data = request_massive_data[c]
                let p_key = request_data.key;
                let p_host = request_data.host;
                let p_vm_proc_id = request_data.vm_proc_id;
                let p_vm_name = request_data.vm_name;
                let p_cpu_total = request_data.cpu_total;
                let p_cpu_usage = request_data.cpu_usage;
                let p_memory_allocated = request_data.memory_allocated;
                let p_host_memory_usage = request_data.host_memory_usage;
                let p_host_memory_peak = request_data.host_memory_peak;
                let p_host_memory_swap = request_data.host_memory_swap;
                let p_context_switch = request_data.context_switch;
                let p_net_tx_pkts = parseFloat(request_data.net_tx_pkts);
                let p_net_rx_pkts = parseFloat(request_data.net_rx_pkts);
                let p_net_tx_bytes = parseFloat(request_data.net_tx_bytes);
                let p_net_rx_bytes = parseFloat(request_data.net_rx_bytes);
                let p_disk_total = request_data.disk_total;
                let p_disk_read_reqs_sec = parseFloat(request_data.disk_read_reqs_sec);
                let p_disk_write_reqs_sec = parseFloat(request_data.disk_write_reqs_sec);
                let p_disk_read_bytes_sec = parseFloat(request_data.disk_read_bytes_sec);
                let p_disk_write_bytes_sec = parseFloat(request_data.disk_write_bytes_sec);
                let p_disk_physical = request_data.disk_physical;
                let p_disk_capacity = request_data.disk_capacity;
                let p_sumarized = request_data.sumarized;
                let p_clock = request_data.clock;
                await client.query(queriesBase('insertVirtManagerData'), [p_key, p_host, p_vm_proc_id, p_vm_name, p_cpu_total, p_cpu_usage, p_memory_allocated, p_host_memory_usage, p_host_memory_peak, p_host_memory_swap, p_context_switch, p_net_tx_pkts, p_net_rx_pkts, p_net_tx_bytes, p_net_rx_bytes, p_disk_total, p_disk_read_reqs_sec, p_disk_write_reqs_sec, p_disk_read_bytes_sec, p_disk_write_bytes_sec, p_disk_physical, p_disk_capacity, p_sumarized, p_clock, ], (error, results) => {
                    if (error) {
                        throw error;
                    }
                });
            }
        await client.query('COMMIT');
        } catch(e){
            await client.query('ROLLBACK');
            throw e
        } finally {
          client.release();
        }   
    return response.status(200).json('ok');
}

module.exports = {
    setData,
    setMassData,
  }