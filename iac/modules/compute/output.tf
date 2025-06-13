output "nombre_cluster" {
  value = aws_ecs_cluster.cluster_tienda_virtual_servicios.name
}

output "task_definition_arn" {
  value = aws_ecs_cluster.cluster_tienda_virtual_servicios.arn
}
