function recuperarMinhaColeta(cd_coleta, data, horario, cd_material, observacao) {

    var dataColeta = document.getElementById('data-editar-coleta');
    var horarioColeta = document.getElementById('horario-editar-coleta');
    var materialColeta = document.getElementById('material-editar-coleta');
    var observacaoColeta = document.getElementById('obs-editar-coleta');

    let cd_coleta_id = cd_coleta;

    dataColeta.value = data;
    horarioColeta.value = horario;
    materialColeta.value = cd_material;
    observacaoColeta.value = observacao;

}