import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const store = new Vuex.Store({
   
    state: {
        leitosConstante:null,
        leitos: null,
        totalLivres:0,
       
      },
      mutations: {
        BuscarLeitosStore (state,data) {
          
          axios
          .get("https://web2.smsrio.org/testefront/listarLeito.php?cnes="+data.cnes)
          .then((response) => {
            state.leitosConstante = response.data.dados
            state.leitos = response.data.dados
          });
       
        },
        Filtro (state,data) {   
          
          if(data.leitoStatus == 0){
            state.leitos =  state.leitosConstante.filter(val=>val.leitoStatus == data.leitoStatus)     
               
          }else if(data.leitoStatus == 1){
            state.leitos =  state.leitosConstante.filter(val=>val.leitoStatus == data.leitoStatus)   
          
          } else if(!data.leitoStatus){
            state.leitos =  state.leitosConstante 
          } 


          if(data.leito){
            state.leitos =  state.leitosConstante.filter(val=>val.leito == data.leito)  
          }
        }
      },

      getters : {
        BuscarLeitosStore(state){
          
            var total = {}
            if(state.leitos){
    

              total.livre =state.leitosConstante.filter(item => item.leitoStatus == 0).length
              total.ocupado =state.leitosConstante.filter(item => item.leitoStatus == 1).length
              total.TotalLeitos =state.leitosConstante.filter(item => item).length

             

            }else{
               total = 0
            }
     
     
          return   state.totalLivres = total
          

        
        },
  
        
    }
});
 
export default store 