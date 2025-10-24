<?php

    namespace BruzDeporte\config\interfaces;

    interface Crud {
        public function store($data);
        public function findAll();
        public function find($id);
        public function update($id, $data);
        public function delete($id);
    }
