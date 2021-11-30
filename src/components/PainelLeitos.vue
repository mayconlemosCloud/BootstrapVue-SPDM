<template>
     <b-card class="painelLeitos mb-2">
             
             <b-container>
                 <b-row>
                     <b-col>
                       <b-button  v-b-modal.modal-1 @click="ModalData(row)"  v-for="row in Leitos" :key="row.leito" :variant="row.leitoStatus ==1 ?'secondary':'success'" class="mx-2 my-2 py-4 px-4 rounded ">{{row.leito}}</b-button>
   
                     </b-col>
                 </b-row>
             </b-container>
           
             <b-modal id="modal-1" title="" size="sm">
             
               <table class="table table-striped">
                    <thead>
                      <tr>
                       
                        <th scope="col">Nome</th>
                        <th scope="col">Idade</th>
                        <th scope="col">Leito</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                    
                        <td>{{leito.nome}}</td>
                        <td>{{leito.idade}}</td>
                        <td>{{leito.leito}}</td>
                      
                      </tr>
                      
                    </tbody>
                  </table>
            </b-modal>
                 
   </b-card>
</template>

<script>
export default {
   data() {
    return {   
      leitos:null,
      leito:{}
    };
  },
  computed:{
      Leitos(){
             return this.$store.state.leitos
      }
    
  },
  methods:{
    ModalData(val){
      this.leito = val

    }
  }

}
</script>

<style >
.painelLeitos{
    height: 500px;
    max-height: 500px;

}

</style>