using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace PROYECTO_LISTA_TAREAS.Models;

public partial class ListaTareasContext : DbContext
{
    public ListaTareasContext()
    {
    }

    public ListaTareasContext(DbContextOptions<ListaTareasContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Tarea> Tareas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=ListaTareas;Trusted_Connection=SSPI;MultipleActiveResultSets=true;Trust Server Certificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tarea>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Tarea");

            entity.Property(e => e.FechaRegistro)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fechaRegistro");
            entity.Property(e => e.NombreTarea)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombreTarea");
            entity.Property(e => e.TareaId)
                .ValueGeneratedOnAdd()
                .HasColumnName("tareaId");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
