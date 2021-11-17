const { BadRequest, NotFoundError } = require("../../../src/common/ExceptionHandler");
const TaskService = require("../../../src/business/services/task");
const taskService = new TaskService();

const request = require("supertest");
const app = require("../../../src/app");

describe("TaskService", () => {
    
  describe("- ERROR CASES -", () => {
    it("insertTask | Ensure object validation failed", async () => {
      const objectTask = {
        id: 3
      };

      const result = await taskService.insertTask(objectTask);
      expect(result).toBe(new BadRequest("Insert Task Services | the task object is not in a correct format").message);
      expect(new BadRequest().status).toBe(400);

    });

    it("insertTask | Ensure the description length is greater than 2500", async () => {
      const objectTask = {
        id: 3,
        description: `Há pouco tempo, os ambientalistas reclamávamos da falta de espaço na mídia. Hoje o problema é inverso. Escreve-se e fala-se tanto sobre o assunto, que as pessoas nem lêem mais os artigos com a abertura "Nosso planeta passa por alterações gravíssimas, etc.". "Na era da informação, estamos todos desinformados", conforme li já onde não sei mais onde...

        Os artigos publicados neste início de ano oscilam entre duas correntes; Evaristo Miranda, da Embrapa, publicou um artigo no Estado de São Paulo, comparando quanta floresta havia há 8.000 anos, com quanta há hoje. A conclusão, é que a Europa, e não o Brasil, é a grande desmatadora, vindo de 7% para 0,1%. Este artigo ecoa o livro "Chutando a escada" de Ha-Joon Chang de Cambridge, que descreve como os países desenvolvidos, uma vez chegando lá, tentam impedir o desenvolvimento dos outros. Trocando em miúdos, parte do mundo desenvolveu-se antes, poluiu antes e agora quer dividir a poluição, mas não o desenvolvimento gerado por ela.
        
        Em uma outra corrente, Contardo Calligaris publicou na Folha de São Paulo da quinta feira, um comentário sobre a dificuldade que temos de pensar coletivamente. Ele escreve que o fundo cristão de nossa cultura reafirma nossa irmandade, mas que a salvação é decidida um a um. Agir contra o interesse do indivíduo, mas a favor do grupo não é de nosso feitio. Luis Fernando Veríssimo também escreveu uma coluna irônica no Estado de São Paulo, lembrando que somos inquilinos do planeta, e que temos obrigação de retornar o imóvel como encontramos.
        
        Para usar uma analogia ao gosto do nosso presidente, estas duas correntes de pensamento lembram o time de futebol que ao invés de jogar, preocupa-se em descobrir culpados, ou então o time que é tão altruísta que ninguém faz gol, porque sempre passa a bola para o outro fazer.
        
        Somos 6,5 bilhões de pessoas queimando carbono. A salvação está em criar consensos em torno da limitação de sua liberação. Já conseguimos sucessos parciais com a educação, a natalidade, e o cigarro. Desta vez, no entanto, a coisa é mais complicada porque envolve limitar o conceito de propriedade, que nos é tão caro. Desta forma, a Amazônia não seria 100% brasileira, assim como Yellowstone não seria 100% americano. O seu carro também não seria 100% seu, porque afinal, todos pagamos pelo carbono que ele lança na atmosfera.
        Somos 6,5 bilhões de pessoas queimando carbono. A salvação está em criar consensos em torno da limitação de sua liberação. Já conseguimos sucessos parciais com a educação, a natalidade, e o cigarro. Desta vez, no entanto, a coisa é mais complicada porque envolve limitar o conceito de propriedade, que nos é tão caro. Desta forma, a Amazônia não seria 100% brasileira, assim como Yellowstone não seria 100% americano. O seu carro também não seria 100% seu, porque afinal, todos pagamos pelo carbono que ele lança na atmosfera.
        `
      };

      const result = await taskService.insertTask(objectTask);
      expect(result).toBe(new BadRequest("Insert Task Services | the description size is too big").message);
      expect(new BadRequest().status).toBe(400);

    });

    it("updateTask | Ensure object validation failed", async () => {
      const objectTask = {
        id: 2
      };

      const result = await taskService.updateTask(objectTask);
      expect(result).toBe(new BadRequest("Update Task Services | the task object is not in a correct format").message);

    });

    it("updateTask | Ensure the description length is greater than 2500", async () => {
      const objectTask = {
        id: 2,
        description: `Há pouco tempo, os ambientalistas reclamávamos da falta de espaço na mídia. Hoje o problema é inverso. Escreve-se e fala-se tanto sobre o assunto, que as pessoas nem lêem mais os artigos com a abertura "Nosso planeta passa por alterações gravíssimas, etc.". "Na era da informação, estamos todos desinformados", conforme li já onde não sei mais onde...

        Os artigos publicados neste início de ano oscilam entre duas correntes; Evaristo Miranda, da Embrapa, publicou um artigo no Estado de São Paulo, comparando quanta floresta havia há 8.000 anos, com quanta há hoje. A conclusão, é que a Europa, e não o Brasil, é a grande desmatadora, vindo de 7% para 0,1%. Este artigo ecoa o livro "Chutando a escada" de Ha-Joon Chang de Cambridge, que descreve como os países desenvolvidos, uma vez chegando lá, tentam impedir o desenvolvimento dos outros. Trocando em miúdos, parte do mundo desenvolveu-se antes, poluiu antes e agora quer dividir a poluição, mas não o desenvolvimento gerado por ela.
        
        Em uma outra corrente, Contardo Calligaris publicou na Folha de São Paulo da quinta feira, um comentário sobre a dificuldade que temos de pensar coletivamente. Ele escreve que o fundo cristão de nossa cultura reafirma nossa irmandade, mas que a salvação é decidida um a um. Agir contra o interesse do indivíduo, mas a favor do grupo não é de nosso feitio. Luis Fernando Veríssimo também escreveu uma coluna irônica no Estado de São Paulo, lembrando que somos inquilinos do planeta, e que temos obrigação de retornar o imóvel como encontramos.
        
        Para usar uma analogia ao gosto do nosso presidente, estas duas correntes de pensamento lembram o time de futebol que ao invés de jogar, preocupa-se em descobrir culpados, ou então o time que é tão altruísta que ninguém faz gol, porque sempre passa a bola para o outro fazer.
        
        Somos 6,5 bilhões de pessoas queimando carbono. A salvação está em criar consensos em torno da limitação de sua liberação. Já conseguimos sucessos parciais com a educação, a natalidade, e o cigarro. Desta vez, no entanto, a coisa é mais complicada porque envolve limitar o conceito de propriedade, que nos é tão caro. Desta forma, a Amazônia não seria 100% brasileira, assim como Yellowstone não seria 100% americano. O seu carro também não seria 100% seu, porque afinal, todos pagamos pelo carbono que ele lança na atmosfera.
        Somos 6,5 bilhões de pessoas queimando carbono. A salvação está em criar consensos em torno da limitação de sua liberação. Já conseguimos sucessos parciais com a educação, a natalidade, e o cigarro. Desta vez, no entanto, a coisa é mais complicada porque envolve limitar o conceito de propriedade, que nos é tão caro. Desta forma, a Amazônia não seria 100% brasileira, assim como Yellowstone não seria 100% americano. O seu carro também não seria 100% seu, porque afinal, todos pagamos pelo carbono que ele lança na atmosfera.
        `
      };

      const result = await taskService.updateTask(objectTask);
      expect(result).toBe(new BadRequest("Update Task Services | the description size is too big").message);
      expect(new BadRequest().status).toBe(400);

    });   


    it("completeTask | Ensure object validation failed", async () => {
      const objectTask = {
        id: 2,
        description : 'teste'
      };

      const result = await taskService.completeTask(objectTask);
      expect(result).toBe(new BadRequest("Complete Task Services | the task object is not in a correct format").message);

    });

    it("completeTask | Ensure the description length is greater than 2500", async () => {
      const objectTask = {
        id: 2,
        description: `Há pouco tempo, os ambientalistas reclamávamos da falta de espaço na mídia. Hoje o problema é inverso. Escreve-se e fala-se tanto sobre o assunto, que as pessoas nem lêem mais os artigos com a abertura "Nosso planeta passa por alterações gravíssimas, etc.". "Na era da informação, estamos todos desinformados", conforme li já onde não sei mais onde...

        Os artigos publicados neste início de ano oscilam entre duas correntes; Evaristo Miranda, da Embrapa, publicou um artigo no Estado de São Paulo, comparando quanta floresta havia há 8.000 anos, com quanta há hoje. A conclusão, é que a Europa, e não o Brasil, é a grande desmatadora, vindo de 7% para 0,1%. Este artigo ecoa o livro "Chutando a escada" de Ha-Joon Chang de Cambridge, que descreve como os países desenvolvidos, uma vez chegando lá, tentam impedir o desenvolvimento dos outros. Trocando em miúdos, parte do mundo desenvolveu-se antes, poluiu antes e agora quer dividir a poluição, mas não o desenvolvimento gerado por ela.
        
        Em uma outra corrente, Contardo Calligaris publicou na Folha de São Paulo da quinta feira, um comentário sobre a dificuldade que temos de pensar coletivamente. Ele escreve que o fundo cristão de nossa cultura reafirma nossa irmandade, mas que a salvação é decidida um a um. Agir contra o interesse do indivíduo, mas a favor do grupo não é de nosso feitio. Luis Fernando Veríssimo também escreveu uma coluna irônica no Estado de São Paulo, lembrando que somos inquilinos do planeta, e que temos obrigação de retornar o imóvel como encontramos.
        
        Para usar uma analogia ao gosto do nosso presidente, estas duas correntes de pensamento lembram o time de futebol que ao invés de jogar, preocupa-se em descobrir culpados, ou então o time que é tão altruísta que ninguém faz gol, porque sempre passa a bola para o outro fazer.
        
        Somos 6,5 bilhões de pessoas queimando carbono. A salvação está em criar consensos em torno da limitação de sua liberação. Já conseguimos sucessos parciais com a educação, a natalidade, e o cigarro. Desta vez, no entanto, a coisa é mais complicada porque envolve limitar o conceito de propriedade, que nos é tão caro. Desta forma, a Amazônia não seria 100% brasileira, assim como Yellowstone não seria 100% americano. O seu carro também não seria 100% seu, porque afinal, todos pagamos pelo carbono que ele lança na atmosfera.
        Somos 6,5 bilhões de pessoas queimando carbono. A salvação está em criar consensos em torno da limitação de sua liberação. Já conseguimos sucessos parciais com a educação, a natalidade, e o cigarro. Desta vez, no entanto, a coisa é mais complicada porque envolve limitar o conceito de propriedade, que nos é tão caro. Desta forma, a Amazônia não seria 100% brasileira, assim como Yellowstone não seria 100% americano. O seu carro também não seria 100% seu, porque afinal, todos pagamos pelo carbono que ele lança na atmosfera.
        `,
        complete: true,
        completiondate: "15/11/2021"
      };

      const result = await taskService.completeTask(objectTask);
      expect(result).toBe(new BadRequest("Complete Task Services | the description size is too big").message);
      expect(new BadRequest().status).toBe(400);

    });
    

    it("deleteTask | Ensure idtask is empty", async () => {

      const result = await taskService.deleteTask();
      expect(result).toBe(new NotFoundError("Delete Task Services | idTask value is invalid").message);
      expect(new NotFoundError().status).toBe(404);

    });

  });
});
