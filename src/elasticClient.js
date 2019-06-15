import elasticsearch from 'elasticsearch';
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log : [{
    type: 'stdio',
    levels: ['error', 'warning'] // change these options
  }]
});
export default client;