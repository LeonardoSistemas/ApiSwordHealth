const { BadRequest, NotFoundError } = require("../../../src/common/ExceptionHandler");
const TaskRepository = require("../../../src/business/repository/task");
const taskRepository = new TaskRepository();

describe("TaskRepository", () => {
  describe("- SUCESS CASES -", () => {    
    it("consultUser | Ensure that the task was successfully consulted", async () => {      
      
      const result = await taskRepository.consultTask();

      expect(result).toBeTruthy();
    });

    it("insetTask | Ensure that the task was successfully inserted", async () => {
      const objectTask = {
        id: 3,
        description: "Test API"
      };
     
      const result = await taskRepository.insertTask(objectTask);

      expect(result).toBeDefined();
    });

    it("udpateTask | Ensure that the task was successfully changed", async () => {
      const objectTask = {
        id: 3,
        description: "Test API - update successfully"
      };

      const result = await taskRepository.updateTask(objectTask);

      expect(result).toBeDefined();
    });

    it("deleteTask | Ensure that the task was successfully deleted", async () => {
      const idTask = 3;

      const result = await taskRepository.deleteTask(idTask);

      expect(result).toBeDefined();
    });
  });

  describe("- ERROR CASES -", () => {
    it("insertTask | Ensure object validation failed", async () => {
      const objectTask = {
        id: 3
      };

      try {
        const result = await taskRepository.insertTask(objectTask);
      } catch (error) {        
        expect(error.name).toBe("BadRequest");
        expect(error.message).toBe("Insert Task Repository | the task object is not in a correct format");
      }      
    });

    it("insertTask | Ensure the description length is greater than 2500", async () => {
      const objectTask = {
        id: 3,
        description : `Há pouco tempo, os ambientalistas reclamávamos da falta de espaço na mídia. Hoje o problema é inverso. Escreve-se e fala-se tanto sobre o assunto, que as pessoas nem lêem mais os artigos com a abertura "Nosso planeta passa por alterações gravíssimas, etc.". "Na era da informação, estamos todos desinformados", conforme li já onde não sei mais onde...

        Os artigos publicados neste início de ano oscilam entre duas correntes; Evaristo Miranda, da Embrapa, publicou um artigo no Estado de São Paulo, comparando quanta floresta havia há 8.000 anos, com quanta há hoje. A conclusão, é que a Europa, e não o Brasil, é a grande desmatadora, vindo de 7% para 0,1%. Este artigo ecoa o livro "Chutando a escada" de Ha-Joon Chang de Cambridge, que descreve como os países desenvolvidos, uma vez chegando lá, tentam impedir o desenvolvimento dos outros. Trocando em miúdos, parte do mundo desenvolveu-se antes, poluiu antes e agora quer dividir a poluição, mas não o desenvolvimento gerado por ela.
        
        Em uma outra corrente, Contardo Calligaris publicou na Folha de São Paulo da quinta feira, um comentário sobre a dificuldade que temos de pensar coletivamente. Ele escreve que o fundo cristão de nossa cultura reafirma nossa irmandade, mas que a salvação é decidida um a um. Agir contra o interesse do indivíduo, mas a favor do grupo não é de nosso feitio. Luis Fernando Veríssimo também escreveu uma coluna irônica no Estado de São Paulo, lembrando que somos inquilinos do planeta, e que temos obrigação de retornar o imóvel como encontramos.
        
        Para usar uma analogia ao gosto do nosso presidente, estas duas correntes de pensamento lembram o time de futebol que ao invés de jogar, preocupa-se em descobrir culpados, ou então o time que é tão altruísta que ninguém faz gol, porque sempre passa a bola para o outro fazer.
        
        Somos 6,5 bilhões de pessoas queimando carbono. A salvação está em criar consensos em torno da limitação de sua liberação. Já conseguimos sucessos parciais com a educação, a natalidade, e o cigarro. Desta vez, no entanto, a coisa é mais complicada porque envolve limitar o conceito de propriedade, que nos é tão caro. Desta forma, a Amazônia não seria 100% brasileira, assim como Yellowstone não seria 100% americano. O seu carro também não seria 100% seu, porque afinal, todos pagamos pelo carbono que ele lança na atmosfera.
        Somos 6,5 bilhões de pessoas queimando carbono. A salvação está em criar consensos em torno da limitação de sua liberação. Já conseguimos sucessos parciais com a educação, a natalidade, e o cigarro. Desta vez, no entanto, a coisa é mais complicada porque envolve limitar o conceito de propriedade, que nos é tão caro. Desta forma, a Amazônia não seria 100% brasileira, assim como Yellowstone não seria 100% americano. O seu carro também não seria 100% seu, porque afinal, todos pagamos pelo carbono que ele lança na atmosfera.
        `
      };

      const result = await taskRepository.insertTask(objectTask);
      expect(result).toBe(new BadRequest("Insert Task Repository | the description size is too big").message);
      expect(new BadRequest().status).toBe(400);
     
    });

    it("updateTask | Ensure object validation failed", async () => {
      const objectTask = {
        id: 3
      };

      const result = await taskRepository.updateTask(objectTask);
      expect(result).toBe(new BadRequest("Update Task Repository | the task object is not in a correct format").message);

    });

    it("updateTask | Ensure the description length is greater than 2500", async () => {
      const objectTask = {
        id: 2,
        description : `Há pouco tempo, os ambientalistas reclamávamos da falta de espaço na mídia. Hoje o problema é inverso. Escreve-se e fala-se tanto sobre o assunto, que as pessoas nem lêem mais os artigos com a abertura "Nosso planeta passa por alterações gravíssimas, etc.". "Na era da informação, estamos todos desinformados", conforme li já onde não sei mais onde...

        Os artigos publicados neste início de ano oscilam entre duas correntes; Evaristo Miranda, da Embrapa, publicou um artigo no Estado de São Paulo, comparando quanta floresta havia há 8.000 anos, com quanta há hoje. A conclusão, é que a Europa, e não o Brasil, é a grande desmatadora, vindo de 7% para 0,1%. Este artigo ecoa o livro "Chutando a escada" de Ha-Joon Chang de Cambridge, que descreve como os países desenvolvidos, uma vez chegando lá, tentam impedir o desenvolvimento dos outros. Trocando em miúdos, parte do mundo desenvolveu-se antes, poluiu antes e agora quer dividir a poluição, mas não o desenvolvimento gerado por ela.
        
        Em uma outra corrente, Contardo Calligaris publicou na Folha de São Paulo da quinta feira, um comentário sobre a dificuldade que temos de pensar coletivamente. Ele escreve que o fundo cristão de nossa cultura reafirma nossa irmandade, mas que a salvação é decidida um a um. Agir contra o interesse do indivíduo, mas a favor do grupo não é de nosso feitio. Luis Fernando Veríssimo também escreveu uma coluna irônica no Estado de São Paulo, lembrando que somos inquilinos do planeta, e que temos obrigação de retornar o imóvel como encontramos.
        
        Para usar uma analogia ao gosto do nosso presidente, estas duas correntes de pensamento lembram o time de futebol que ao invés de jogar, preocupa-se em descobrir culpados, ou então o time que é tão altruísta que ninguém faz gol, porque sempre passa a bola para o outro fazer.
        
        Somos 6,5 bilhões de pessoas queimando carbono. A salvação está em criar consensos em torno da limitação de sua liberação. Já conseguimos sucessos parciais com a educação, a natalidade, e o cigarro. Desta vez, no entanto, a coisa é mais complicada porque envolve limitar o conceito de propriedade, que nos é tão caro. Desta forma, a Amazônia não seria 100% brasileira, assim como Yellowstone não seria 100% americano. O seu carro também não seria 100% seu, porque afinal, todos pagamos pelo carbono que ele lança na atmosfera.
        Somos 6,5 bilhões de pessoas queimando carbono. A salvação está em criar consensos em torno da limitação de sua liberação. Já conseguimos sucessos parciais com a educação, a natalidade, e o cigarro. Desta vez, no entanto, a coisa é mais complicada porque envolve limitar o conceito de propriedade, que nos é tão caro. Desta forma, a Amazônia não seria 100% brasileira, assim como Yellowstone não seria 100% americano. O seu carro também não seria 100% seu, porque afinal, todos pagamos pelo carbono que ele lança na atmosfera.
        `
      };

      const result = await taskRepository.updateTask(objectTask);
      expect(result).toBe(new BadRequest("Update Task Repository | the description size is too big").message);
      expect(new BadRequest().status).toBe(400);
     
    });

    it("updateTask | Ensure object validation failed", async () => {
      const objectTask = {
        id: 4,
        description: "Test API"
      };

      const result = await taskRepository.updateTask(objectTask);
      expect(result).toBe(new NotFoundError("Update Task Repository | no tasks found for this id").message);
      expect(new NotFoundError().status).toBe(404);

    });

    it("deleteTask | Ensure idtask is empty", async () => {

      const result = await taskRepository.deleteTask();
      expect(result).toBe(new NotFoundError("Delete Task Repository | idTask value is invalid").message);
      expect(new NotFoundError().status).toBe(404);

    });
  });
});
